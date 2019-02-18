import React from "react";
import HotelChainSelector from "../HotelChainSelector";
import {AsyncList} from "../AsyncList";
import EmployeeManager from "./EmployeeManager";
import {simulateDelay} from "../../services/simulator-service";

export default class HotelChainEmployeesManager extends React.Component {
  state = {
    selectedHotelChainId: null,
    loadingEmployees: false,
    employees: []
  };

  selectHotelChain = async selectedHotelChainId => {
    if (selectedHotelChainId !== this.state.selectedHotelChainId) {
      this.setState({selectedHotelChainId, loadingEmployees: true});
      await simulateDelay(1000);
      const employees = [{sinOrSsn: 100, givenName: "John", familyName: "Porter"}];
      this.setState({employees, loadingEmployees: false});
    }
  };

  render() {
    return <>
      <h2>Employees</h2>
      <HotelChainSelector onChange={this.selectHotelChain}/>
      {this.state.selectedHotelChainId && <>
        <button type="button">
          + Add an Employee
        </button>
        <AsyncList placeholderMessage="No employees for selected hotel" loading={this.state.loadingEmployees}>
          {this.state.employees.map(employee =>
            <li key={employee.sinOrSsn}><EmployeeManager {...employee}/></li>)}
        </AsyncList>
      </>}
    </>
  }
}