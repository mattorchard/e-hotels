const insertAddress = async (client, {streetNumber, streetName, city, country}) => {
  const response = await client.query("INSERT INTO address VALUES (DEFAULT, $1, $2, $3, $4) RETURNING id",
    [streetNumber, streetName, city, country]);
  return response.rows[0].id
};

module.exports = {insertAddress};