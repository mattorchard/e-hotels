const pool = require("./pool");
const path = require('path');
const fs = require('fs');
const insertSampleData = require("./sql-scripts/insert-sample-data");

const readFile = filePath =>
  new Promise((resolve, reject) =>
    fs.readFile(path.join(__dirname, filePath), (error, data) =>
      error ? reject(error) : resolve(data + "")
));

const executeScript = async(path) => {
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

const hasSampleData = async () => {
  try {
    const {rows} = await pool.query("SELECT * FROM hotel_chain");
    return rows.length > 1;
  } catch (error) {
    return false;
  }
};


const hasAllRequiredArguments = () => {
  if (process.env.DATABASE_URL) {return true;}
  return [
    "PGHOST", "PGPORT", "PGDATABASE", "PGDATABASE", "PGUSER", "PGPASSWORD"
  ].every(property => process.env[property]);
};

const bootstrap = async () => {
  if (!hasAllRequiredArguments()) {
    console.error(`
    Please specify the following variables as environment variables or by setting them in the .env file
    PGHOST=<DB host name>
    PGPORT=<DB Port (typically 5432)>
    PGDATABASE=<DB name>
    PGUSER=<DB username>
    PGPASSWORD=<DB password>
    `);
    process.exit(-1);
  }
  console.log("Starting database bootstrap");
  try {
    const clearAndReplaceDatabase = "true" == process.env.REPLACE_DATA;
    if (clearAndReplaceDatabase || !(await hasSampleData())) {
      await executeScript("./sql-scripts/drop-tables.sql", "drop all tables");
      await executeScript("./sql-scripts/create-tables.sql", "create tables");
      await insertSampleData(pool);
    } else {
      console.log("Using existing database");
    }
  } catch (error) {
    console.error(`Error in database bootstrap ${error}`);
    process.exit(-1);
  }
  console.log("Completed database bootstrap");
};

module.exports = {bootstrap};