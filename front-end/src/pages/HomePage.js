import React from "react";
import {Link} from "react-router-dom";
import "./HomePage.css";



export default class HomePage extends React.Component {
  render() {
    return <main className="main-content">
      <ul className="primary-nav-link__list">
        <li className="primary-nav-link">
          <Link to="/admin" className="btn">Admin</Link>
        </li>
        <li className="primary-nav-link">
          <Link to="/employee" className="btn">Employee</Link>
        </li>
        <li className="primary-nav-link">
          <Link to="/customer" className="btn">Customer</Link>
        </li>
      </ul>
    </main>;
  }
}