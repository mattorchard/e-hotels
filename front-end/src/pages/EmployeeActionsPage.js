import React from "react";
import "./EmployeeActionsPage.css";
import {Link} from "react-router-dom";
import HeaderContext from "../contexts/HeaderContext";


export default class EmployeeActionsPage extends React.Component {
  static contextType = HeaderContext;
  state = { employee: null };

  loadEmployee = async employeeId => {
    const response = await fetch(`/api/employee/${employeeId}`);
    if (!response.ok) {throw new Error("Unable to fetch employee");}
    const employee = await response.json();
    this.setState({employee});
    return employee;
  };

  async componentDidMount() {
    const {employeeId} = this.props.match.params;

    this.context.setActions([ <Link to="/admin/employees" className="btn">Logout</Link> ]);
    this.context.setPath([
      {url: "/admin/employees", text: "Employees"},
      {url: `/employee/${employeeId}`, text: employeeId + " ", className: "spinner"}
    ]);

    const {givenName, familyName} = await this.loadEmployee(employeeId);

    this.context.setPath([
      {url: "/admin/employees", text: "Employees"},
      {url: `/employee/${employeeId}`, text: `${givenName} ${familyName}`}
    ]);
  }

  render () {
    const {employeeId} = this.props.match.params;
    return <main className="main-content">
      <h2>Employee Actions</h2>
      <p>Logged in as Employee #{employeeId}</p>

    </main>
  }
}