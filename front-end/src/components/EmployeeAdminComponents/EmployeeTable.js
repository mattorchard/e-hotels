import React from "react";
import EmployeeRow from "./EmployeeRow";
import EmployeeModal from "./EmployeeModal";
import CreateEmployeeModal from "./CreateEmployeeModal";


export default class EmployeeTable extends React.Component {

  state = {
    creatingEmployee: false,
    selectedEmployee: null
  };


  openEmployeeModal = employee => {
    this.setState({selectedEmployee: employee});
  };

  render() {
    return <li className="hotel-chain-card">
      <div className="hotel-chain-card__head">
        <h2 id={this.props.hotelChainName} className="hotel-chain-card__title">
          {this.props.hotelChainName}
        </h2>

        <button className="btn fill add-btn"
                type="button"
                onClick={() => this.setState({creatingEmployee: true})}>
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
      <CreateEmployeeModal
        hotelChainName={this.props.hotelChainName}
        isOpen={this.state.creatingEmployee}
        onRequestClose={() => this.setState({creatingEmployee: false})}
        onSave={this.props.onSave}/>
    </li>;
  }
}