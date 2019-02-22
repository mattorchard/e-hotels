const {Pool} = require('pg');
const path = require('path');
const fs = require('fs');
const insertSampleData = require("./sql-scripts/insert-sample-data");

const readFile = filePath =>
  new Promise((resolve, reject) =>
    fs.readFile(path.join(__dirname, filePath), (error, data) =>
      error ? reject(error) : resolve(data + "")
));

const executeScript = async(pool, path) => {
  const script = await readFile(path);
  console.log(`Executing script [${path}]`);
  try {
    await pool.query(script);
  } catch (error) {
    console.error(`Failed to execute [${path}]`);
    throw error;
  }
  console.log(`Successfully executed [${path}]`);
};

const bootstrap = async () => {
  console.log("Starting database bootstrap");
  try {
    const pool = new Pool();
    await executeScript(pool, "./sql-scripts/drop-tables.sql", "drop all tables");
    await executeScript(pool, "./sql-scripts/create-tables.sql", "create tables");
    await insertSampleData(pool);

    pool.end();
  } catch (error) {
    console.error(`Error in database bootstrap ${error}`);
    process.exit(-1);
  }
  console.log("Completed database bootstrap")
};

module.exports = {bootstrap};