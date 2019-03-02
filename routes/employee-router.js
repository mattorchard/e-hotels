const {responseToRows, nestAddress} = require('../services/postgres-service');
const {Pool} = require('pg');
const pool = new Pool();
const lodash = require("lodash");

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
// Add an employee
// Edit an employee
// Delete an employee

module.exports = {getEmployees};