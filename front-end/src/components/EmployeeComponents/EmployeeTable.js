import React from "react";
import EmployeeRow from "./EmployeeRow";


export default class EmployeeTable extends React.Component {
  render() {
    return <li className="hotel-chain-card">
      <div className="hotel-chain-card__head">
        <h3 id={this.props.hotelChainName} className="hotel-chain-card__title">
          {this.props.hotelChainName}
        </h3>

        <button className="btn fill add-btn"
                type="buton">
          Add Employee
        </button>
      </div>

      <div className="horizontal-scroll">
        <table className="employee-table table-spaced">
          <thead className="employee-table__head">
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
            <EmployeeRow key={employee.id} {...employee}/>)}
          </tbody>
        </table>
      </div>
    </li>;
  }
}