const {Pool} = require('pg');
const fs = require('fs');


const readFile = path =>
  new Promise((resolve, reject) =>
    fs.readFile(path, (error, data) =>
      error ? reject(error) : resolve(data + "")
));

const executeScript = async(pool, path, purpose="") => {
  const script = await readFile(path);
  console.log(`Executing script to [${purpose}]`);
  console.log(`Using commands: [${script}]`);
  try {
    await pool.query(script);
  } catch (error) {
    console.error(`Unable to [${purpose}]. Failed to execute [${path}]`);
    throw error;
  }
  console.log(`Successfully [${purpose}]`);
};

const bootstrap = async () => {
  console.log("Starting database bootstrap");
  try {
    const pool = new Pool();
    await executeScript(pool, "./sql-scripts/drop-tables.sql", "drop all tables");
    await executeScript(pool, "./sql-scripts/create-tables.sql", "create tables");
    await executeScript(pool, "./sql-scripts/insert-sample-data.sql", "insert sample data");
    pool.end();
  } catch (error) {
    console.error(`Error in database bootstrap ${error}`);
    process.exit(-1);
  }
  console.log("Completed database bootstrap")
};

module.exports = {bootstrap};