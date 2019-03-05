import React from "react";
import Address from "../Address";
import ClickableRow from "../ClickableRow";
import ExpandingList from "../ExpandingList";

const EmployeeRow = props => {

  const {id, ssn, sin, givenName, familyName, address, roles, onSelectRow} = props;

  return <ClickableRow id={`employeeId-${id}`}
    className="striped"
    onClick={() => onSelectRow(props)}>
    <td><strong>{id}</strong></td>
    <td>
      {givenName} {familyName}
    </td>
    <td>{ssn}</td>
    <td>{sin}</td>
    <td>
      <ul className="no-bullet">
        <ExpandingList>
          {roles.map(role => <li key={role}>
            {role}
          </li>)}
        </ExpandingList>
      </ul>
    </td>
    <td><Address {...address}/></td>
  </ClickableRow>
};
export default EmployeeRow;