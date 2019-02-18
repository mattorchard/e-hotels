import React from "react";
import CheckInManager from "../components/EmployeeComponents/CheckInManager";
import HotelChainEmployeesManager from "../components/EmployeeComponents/HotelChainEmployeesManager";

export default class EmployeePage extends React.Component {
  render() {
    return <main className="main-content">
      <CheckInManager/>
      <HotelChainEmployeesManager/>
    </main>;
  }
}