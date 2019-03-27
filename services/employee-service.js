const {inTransaction} = require("./postgres-service");
const addressService = require("./address-service");

const parseEmployee = ({givenName, familyName, ssn, sin, hotelChainName, roles, address}) => {
  if (!givenName || !familyName || !hotelChainName || !roles || !address || (!sin && !ssn)) {
    throw new Error("Missing fields on employee");
  }
  return {
    givenName, familyName, hotelChainName, roles, address,
    sin: sin || null, ssn: ssn || null
  }
};

const insertRoles = async (client, employeeId, roles) => {
  if (roles.length < 1) {return;}
  const arguments = roles.map((role, index) => `($1, $${index + 2})`);
  await client.query(
    `INSERT INTO employee_role VALUES ${arguments.join(", ")} ON CONFLICT DO NOTHING`,
    [employeeId, ...roles]);
};

const deleteUnusedRoles = async (client, employeeId, roles) => {
  if (roles.length < 1) {return;}
  const arguments = roles.map((r, i) => `$${i + 2}`);
  return await client.query(
    `DELETE FROM employee_role WHERE employee_id = $1 AND role NOT IN (${arguments.join(", ")})`,
    [employeeId, ...roles]);
};

const insertEmployee = (client, {givenName, familyName, ssn, sin, hotelChainName, roles, address}) =>
  inTransaction(client, async client => {
    const addressId = await addressService.insertAddress(client, address);
    const employeeResponse = await client.query(
      "INSERT INTO employee VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING id",
      [ssn, sin, givenName, familyName, addressId, hotelChainName]);
    const employeeId = employeeResponse.rows[0].id;
    await insertRoles(client, employeeId, roles);
    return employeeId;
  });



const updateEmployee = async(client, employeeId, {ssn, sin, givenName, familyName, hotelChainName, roles, address}) => {

  await inTransaction(client, async client => {
    await addressService.updateAddress(client, address);
    await deleteUnusedRoles(client, employeeId, roles);
    await insertRoles(client, employeeId, roles);
    await client.query(
      `UPDATE employee
       SET ssn = $1, sin = $2, given_name = $3, family_name = $4, hotel_chain_name = $5
       WHERE id = $6`,
      [ssn, sin, givenName, familyName, hotelChainName, employeeId]);
  });
};
module.exports = {parseEmployee, insertEmployee, updateEmployee};