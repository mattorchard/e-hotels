import React from "react";
import CheckInManager from "../components/EmployeeComponents/CheckInManager";
import HotelChainEmployeesManager from "../components/EmployeeComponents/HotelChainEmployeesManager";

export default class EmployeePage extends React.Component {
  render() {
    return <main>
      <CheckInManager/>
      <HotelChainEmployeesManager/>
    </main>;
  }
}