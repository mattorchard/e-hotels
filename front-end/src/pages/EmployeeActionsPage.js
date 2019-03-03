import React from "react";
import "./EmployeeActionsPage.css";


export default class EmployeeActionsPage extends React.Component {

  render () {
    const {employeeId} = this.props.match.params;
    return <main className="main-content">
      <h2>Employee Actions</h2>
      <h3>Logged in as {employeeId}</h3>
    </main>
  }
}