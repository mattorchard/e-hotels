import React from "react";
import "./EmployeeActionsPage.css";
import {Link} from "react-router-dom";


export default class EmployeeActionsPage extends React.Component {

  render () {
    const {employeeId} = this.props.match.params;
    return <main className="main-content">
      <h2>Employee Actions</h2>
      <p>Logged in as Employee #{employeeId}</p>
      <Link to="/admin/employees" className="btn">Logout</Link>
    </main>
  }
}