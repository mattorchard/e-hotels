import React from "react";
import Address from "../Address";
import SelectableRow from "../SelectableRow";
import {Link} from "react-router-dom";

export default class EmployeeRow extends React.Component {

  render() {
    const {id, ssn, sin, givenName, familyName, address, roles} = this.props;

    const rowContents = ({selected, cancel}) => <>
      <td><strong>{id}</strong></td>
      <td>
        {givenName} {familyName}
      </td>
      {selected ? <>
        <td colSpan="5">
          <div className="employee-row__actions-row">
            <button type="button" className="btn btn--inline">Edit</button>
            <button type="button" className="btn btn--inline">Delete</button>
            <Link to={`/employee/${id}`} className="btn btn--inline">
              Login&nbsp;as
            </Link>
            <button type="button" className="btn btn--inline" onClick={cancel}>Cancel</button>
          </div>
        </td>
      </> : <>
        <td>{ssn}</td>
        <td>{sin}</td>
        <td>
          <ul className="no-bullet">
            {roles.map(role => <li key={role}>
              {role}
            </li>)}
          </ul>
        </td>
        <td><Address {...address}/></td>
      </>}
    </>;
    return <SelectableRow className="striped"
                          render={rowContents}/>
  }
}