import React from "react";
import EmployeeManager from "./EmployeeManager";
import "./EmployeeTable.css";


export default class EmployeeTable extends React.Component {
  render() {
    return <li className="EmployeeTable__wrapper">
      <h3 id={this.props.hotelChainName}>{this.props.hotelChainName}</h3>
      <table className="EmployeeTable">
        <thead className="EmployeeTable__head">
        <tr>
          <th>ID</th>
          <th>SIN</th>
          <th>SSN</th>
          <th>Name</th>
          <th>Roles</th>
          <th>Address</th>
        </tr>
        </thead>
        <tbody>
        {this.props.employees.map(employee =>
          <EmployeeManager key={employee.id} {...employee}/>)}
        </tbody>
      </table>
    </li>;
  }
}