const {responseToRows, nestAddress, inTransaction} = require('../services/postgres-service');
const {Pool} = require('pg');
const pool = new Pool();
const lodash = require("lodash");
const createError = require('http-errors');


const getEmployees = async (req, res, next) => {
  try {
    const employeesPromise = pool.query(`
    SELECT employee.*, address.street_number, address.street_name, address.city, address.country
    FROM employee, address
    WHERE employee.address_id = address.id`);
    const rolesPromise = pool.query(`SELECT * FROM employee_role`);
    // Await the query results and convert their casing
    const [employeeRows, roleRows] = responseToRows(await Promise.all([employeesPromise, rolesPromise]));

    // Create an address field under each employee
    const employees = employeeRows.map(nestAddress);

    // Create a list of roles under each employee
    const rolesByEmployee = lodash.groupBy(roleRows, "employeeId");
    employees.forEach(employee =>
      employee.roles = (rolesByEmployee[employee.id] || []).map(r => r.role));

    // Group employees by their hotel chain
    const employeesByHotelChainName = lodash.groupBy(employees, "hotelChainName");
    res.send(employeesByHotelChainName);
  } catch (error) {
    console.error("Unable to fetch employees", error);
    next(error);
  }
};

const getEmployee = async (req, res, next) => {
  const {employeeId} = req.params;
  if (!employeeId) {
    return next(new createError.UnprocessableEntity("Must supply ID to fetch employee"));
  }
  try {
    const response = await pool.query(
      `SELECT address.*, employee_role.role as roles, employee.*
      FROM employee, address, employee_role
      WHERE employee.id = $1
      and employee.address_id = address.id
      and employee_id = $1`, [employeeId]);
    const rows = responseToRows(response);
    if (rows.length < 1) {
      return next(createError.NotFound("No employee with that ID"));
    }
    const employee = nestAddress(rows[0]);
    employee.roles = rows.map(row => row.roles);
    res.send(employee)
  } catch (error) {
    console.error(`Unable to fetch employee [${employeeId}]`, error);
    next(error);
  }

};
// Add an employee
// Edit an employee

const deleteEmployee = async(req, res, next) => {
  const {employeeId} = req.params;
  if (!employeeId) {
    return next(new createError.UnprocessableEntity("Must supply ID to delete employee"));
  }

  try {
    const rows = responseToRows(await pool.query("SELECT address_id FROM employee WHERE id = $1", [employeeId]));
    const [{addressId}] = rows;

    await inTransaction(pool, async client => {
      await client.query(`DELETE FROM employee WHERE id = $1`, [employeeId]);
      await client.query(`DELETE FROM address WHERE id = $1`, [addressId]);
    });

    return res.send({message: `Deleted employee ${employeeId}`});
  } catch (error) {
    console.error(`Unable to delete employee [${employeeId}]`, error);
    return next(error);
  }
};

module.exports = {getEmployees, getEmployee, deleteEmployee};