import React from "react";
import Address from "../Address";
import {formatDateShort} from "../../services/format-service";
import {Link} from "react-router-dom";
import SelectableRow from "../SelectableRow";


export default class CustomerRow extends React.Component {

  render() {
    const {id, ssn, sin, givenName, familyName, registeredOn, address} = this.props;


    return <SelectableRow className="striped customer-row"
      render={({selected, cancel}) => selected ?
        <td colSpan="6" className="customer-row__actions">
          <div className="customer-row__actions-row">
            <button type="button" className="btn btn--inline">Edit</button>
            <button type="button" className="btn btn--inline">Delete</button>
            <Link to={`/customer/${id}`} className="btn btn--inline">
              Login&nbsp;as
            </Link>
            <button type="button" className="btn btn--inline" onClick={cancel}>Cancel</button>
          </div>
        </td> :
        <>
          <td><strong>{id}</strong></td>
          <td>{ssn}</td>
          <td>{sin}</td>
          <td>
            {givenName} {familyName}
          </td>
          <td>{formatDateShort(new Date(registeredOn))}</td>
          <td><Address {...address}/></td>
        </>}/>

  }
}