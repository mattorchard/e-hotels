import React from "react";
import HotelChainSelector from "../components/HotelChainSelector";
import {AsyncList} from "../components/AsyncList";
import EmployeeManager from "../components/EmployeeComponents/EmployeeManager";
import {simulateDelay} from "../services/simulator-service";

export default class EmployeePage extends React.Component {
  state = {
    loadingHotelChains: true,
    selectedHotelChainId: null,
    loadingEmployees: false,
    employees: []
  };

  selectHotelChain = async selectedHotelChainId => {
    this.setState({selectedHotelChainId, loadingEmployees: true});
    await simulateDelay(1500);
    const employees = [{sinOrSsn: 505, givenName: "Bill", familyName: "Hoage"}];
    this.setState({employees, loadingEmployees: false});
  };

  render() {
    return <main className="main-content">
      <h2>
        Select a Hotel Chain
      </h2>
        <HotelChainSelector onChange={this.selectHotelChain}/>
      {this.state.selectedHotelChainId && <>
        <h2>Employees</h2>
        <button type="button" className="btn fill add-btn">
          Add an Employee
        </button>
        <AsyncList
          placeholderMessage="No employees for selected hotel"
          className="no-bullet"
          loading={this.state.loadingEmployees}>
          {this.state.employees.map(employee =>
            <li key={employee.sinOrSsn}><EmployeeManager {...employee}/></li>)}
        </AsyncList>
      </>}
    </main>;
  }
}