import React from "react";
import {Link} from "react-router-dom";
import "./HomePage.css";



export default class HomePage extends React.Component {
  render() {
    return <main className="main-content">
      <ul className="primary-nav-link__list">
        <li>
          <Link to="/admin" className="primary-nav-link btn">Admin</Link>
        </li>
        <li>
          <Link to="/employee" className="primary-nav-link btn">Employee</Link>
        </li>
        <li>
          <Link to="/customer" className="primary-nav-link btn">Customer</Link>
        </li>
      </ul>
    </main>;
  }
}