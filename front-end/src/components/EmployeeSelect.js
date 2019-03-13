import React from "react";
import {toast} from "react-toastify";


export default class EmployeeSelect extends React.Component {
  state = {
    loadingEmployees: true,
    employees: []
  };

  async componentDidMount() {
    try {
      this.setState({loadingEmployees: true});
      const response = await fetch();
      if (!response.ok) {
        throw new Error(`Unable to fetch employees ${status}`);
      }
      const employees = await response.json();
      this.setState({employees, loadingEmployees: false});
    } catch(error) {
      console.error("Unable to fetch employees", error);
      toast.error("Unable to fetch employees");
      this.setState({loadingEmployees: false});
    }
  }

  render() {
    return <>
      <input/>
      <table>
      </table>
    </>
  }
}