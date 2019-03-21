const insertAddress = async (client, {streetNumber, streetName, city, country}) => {
  const response = await client.query("INSERT INTO address VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id",
    [streetNumber, streetName, city, country]);
  return response.rows[0].id
};

const updateAddress = async (client, {id, streetNumber, streetName, city, country}) => {
  if (!id) {
    throw new Error("Cannot update address without ID");
  }
  await client.query(
    `UPDATE address
     SET street_number = $1, street_name = $2, city = $3, country = $4
     WHERE id = $5`,
    [streetNumber, streetName, city, country, id]);
};

const deleteAddresses = async(client, addressIds) => {
  if (!addressIds || addressIds.length < 1) {
    return;
  }
  const arguments = addressIds.map((id, index) => `$${index + 1}`);
  await client.query(`DELETE FROM address WHERE id IN (${arguments.join(", ")})`, [...addressIds]);
};

const deleteAddress = async(client, addressId) => deleteAddresses(client, [addressId]);

module.exports = {insertAddress, updateAddress, deleteAddress, deleteAddresses};