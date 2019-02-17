import React from "react";
import {Link} from "react-router-dom";

export default class HomePage extends React.Component {
  render() {
    return <main>
      <ul>
        <li>
          <Link to="/admin">Admin</Link>
        </li>
        <li>
          <Link to="/customer">Customer</Link>
        </li>
        <li>
          <Link to="/employee">Employee</Link>
        </li>
      </ul>
    </main>;
  }
}