import React from "react";
import Address from "../Address";

export default class EmployeeRow extends React.Component {
  render() {
    const {id, ssn, sin, givenName, familyName, address, roles} = this.props;

    return <tr className="striped">
      <td><strong>{id}</strong></td>
      <td>{ssn}</td>
      <td>{sin}</td>
      <td>
        {givenName} {familyName}
      </td>
      <td>
        <ul className="no-bullet">
          {roles.map(role => <li key={role}>
            {role}
          </li>)}
        </ul>
      </td>
      <td><Address {...address}/></td>
    </tr>
  }
}