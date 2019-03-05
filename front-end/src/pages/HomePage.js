import React from "react";
import {Link} from "react-router-dom";
import "./HomePage.css";
import HeaderContext from "../contexts/HeaderContext";



export default class HomePage extends React.Component {
  static contextType = HeaderContext;
  componentDidMount() {
    this.context.setPath([]);
    this.context.setActions(null);
  }

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
      </ul>
    </main>;
  }
}