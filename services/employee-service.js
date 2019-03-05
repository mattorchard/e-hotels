const {inTransaction, responseToRows} = require("./postgres-service");
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
  if (roles.length < 1) {
    return;
  }

  const arguments = roles.map((role, index) => `($1, $${index + 2})`);
  await client.query(`INSERT INTO employee_role VALUES ${arguments.join(", ")}`, [employeeId, ...roles]);
};

const insertEmployee = async (client, {givenName, familyName, ssn, sin, hotelChainName, roles, address}) =>
  await inTransaction(client, async client => {
    const addressId = await addressService.insertAddress(client, address);
    const employeeResponse = await client.query(
      "INSERT INTO employee VALUES (DEFAULT, $1, $2, $3, $4, $5, $6) RETURNING id",
      [ssn, sin, givenName, familyName, addressId, hotelChainName]);
    const employeeId = employeeResponse.rows[0].id;
    await insertRoles(client, employeeId, roles);
  });

const updateEmployee = async(client, employeeId, {givenName, familyName, ssn, sin, hotelChainName, roles, address}) => {
  const rolesResponse = await client.query("SELECT * FROM employee_role where employee_id = $1", [employeeId]);
  const rows = responseToRows(rolesResponse);
  const oldRoles = rows.map(row => row.role);
  await inTransaction(client, async client => {
    await addressService.updateAddress(client, address);
  });
};
module.exports = {parseEmployee, insertEmployee, updateEmployee};