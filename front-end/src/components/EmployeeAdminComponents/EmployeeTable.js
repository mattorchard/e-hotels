import React from "react";
import EmployeeRow from "./EmployeeRow";
import EmployeeModal from "./EmployeeModal";


export default class EmployeeTable extends React.Component {

  state = {
    selectedEmployee: null
  };


  openEmployeeModal = employee => {
    this.setState({selectedEmployee: employee});
  };

  render() {
    return <li className="hotel-chain-card">
      <div className="hotel-chain-card__head">
        <h3 id={this.props.hotelChainName} className="hotel-chain-card__title">
          {this.props.hotelChainName}
        </h3>

        <button className="btn fill add-btn"
                type="button">
          Add Employee
        </button>
      </div>

      <div className="horizontal-scroll">
        <table className="employee-table table-spaced">
          <thead className="employee-table__head">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SSN</th>
            <th>SIN</th>
            <th>Roles</th>
            <th>Address</th>
          </tr>
          </thead>
          <tbody>
          {this.props.employees.map(employee =>
            <EmployeeRow key={employee.id} {...employee} onSelectRow={this.openEmployeeModal}/>)}
          </tbody>
        </table>
      </div>
      <EmployeeModal
        employee={this.state.selectedEmployee}
        onRequestClose={() => this.setState({selectedEmployee: null})}
        onSave={this.props.onSave}/>
    </li>;
  }
}