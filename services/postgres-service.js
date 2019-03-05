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
    const result = await callback(client);
    await client.query("COMMIT");
    return result;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
};

const diffLists = (oldList, newList) => {
  const oldSet = oldList.reduce((set, role) => set.add(role), new Set());
  const newSet = newList.reduce((set, role) => set.add(role), new Set());
  const toDelete = [];
  const toAdd = [];
  oldSet.forEach(oldItem => newSet.has(oldItem) || toDelete.push(oldItem));
  newSet.forEach(newItem => oldSet.has(newItem) || toAdd.push(newItem));
  return {toAdd, toDelete};
};

module.exports = {responseToRows, nestAddress, nestManager, inTransaction, diffLists};