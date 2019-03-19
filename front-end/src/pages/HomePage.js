import React from "react";
import {Link} from "react-router-dom";
import "./HomePage.css";



export default class HomePage extends React.Component {
  render() {
    return <main className="main-content">
      <ul className="primary-nav-link__list">
        <li className="primary-nav-link">
          <Link to="/admin/hotel-chains" className="btn">Hotel Chains</Link>
        </li>
        <li className="primary-nav-link">
          <Link to="/admin/employees" className="btn">Employees</Link>
        </li>
        <li className="primary-nav-link">
          <Link to="/admin/customers" className="btn">Customers</Link>
        </li>
        <li className="primary-nav-link">
          <Link to="/calendar" className="btn">Calendar</Link>
        </li>
      </ul>
    </main>;
  }
}