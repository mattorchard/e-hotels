import React from "react";
import Address from "../Address";
import {formatDateShort} from "../../services/format-service";


export default class CustomerRow extends React.Component {
  render() {
    const {id, ssn, sin, givenName, familyName, registeredOn, address} = this.props;

    return <tr className="striped">
      <td><strong>{id}</strong></td>
      <td>{ssn}</td>
      <td>{sin}</td>
      <td>
        {givenName} {familyName}
      </td>
      <td>{formatDateShort(new Date(registeredOn))}</td>
      <td><Address {...address}/></td>
    </tr>
  }
}