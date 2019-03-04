const camelCase = require('camelcase');


/**
 * Converts snake case objects to camel case (one level deep)
 * @param object Object with keys of the form foo_bar
 * @returns {{}} Object with keys of the form fooBar
 */
const snakeToCamel = object => Object.entries(object)
.reduce((camel, [key, value]) => {
  camel[camelCase(key)] = value;
  return camel;
}, {});

/**
 * Converts all rows in a response (or list of responses) to camel case
 * @param response a query response object
 * @returns a list (or list of lists) of rows with camel case keys
 */
const responseToRows = response => {
  if (Array.isArray(response)) {
    return response.map(r => r
      ? r.rows.map(snakeToCamel)
      : []);
  } else {
    return response.rows.map(snakeToCamel);
  }
};

const nestAddress = ({streetNumber, streetName, city, country, addressId, ...parent}) =>
  ({...parent, address: {id: addressId, streetNumber, streetName, city, country}});

const nestManager = ({givenName, familyName, managerId, ...parent}) =>
  ({...parent, manager: {id: managerId, givenName, familyName}});

const inTransaction = async (pool, callback) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await callback(client);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {responseToRows, nestAddress, nestManager, inTransaction};