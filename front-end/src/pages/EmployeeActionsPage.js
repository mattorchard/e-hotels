import React from "react";
import "./EmployeeActionsPage.css";
import {Link} from "react-router-dom";
import HeaderContext from "../contexts/HeaderContext";
import CheckIn from "../components/EmployeeActionsComponents/CheckIn";
import {toast} from "react-toastify";

export default class EmployeeActionsPage extends React.Component {
  static contextType = HeaderContext;
  state = {
    employee: null
  };

  loadEmployee = async employeeId => {
    const response = await fetch(`/api/employee/${employeeId}`);
    if (!response.ok) {
      throw new Error("Unable to fetch employee");
    }
    const employee = await response.json();
    this.setState({employee});
    return employee;
  };

  async componentDidMount() {
    const {employeeId} = this.props.match.params;

    this.context.setActions(<Link to="/admin/employees" className="btn">Logout</Link>);
    this.context.setPath([
      {url: "/admin/employees", text: "Employees"},
      {url: `/employee/${employeeId}`, text: employeeId + " ", className: "spinner"}
    ]);
    try {
      const {givenName, familyName} = await this.loadEmployee(employeeId);

      this.context.setPath([
        {url: "/admin/employees", text: "Employees"},
        {url: `/employee/${employeeId}`, text: `${givenName} ${familyName}`}
      ]);
    } catch (error) {
      console.error(error);
      toast.error("Unable to login");
    }
  }

  render() {
    // Todo: Add hotelChainName to url to avoid awaiting login before loading check in
    if (this.state.employee) {
      const {hotelChainName, id: employeeId} = this.state.employee;
      return <main className="main-content main-content--clear">
        <CheckIn employeeId={employeeId} hotelChainName={hotelChainName}/>
      </main>
    } else {
      return <main className="main-content">
        <h2 className="spinner">Logging in...</h2>
      </main>
    }
  }
}