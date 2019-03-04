import React from "react";
import Address from "../Address";
import {formatDateShort} from "../../services/format-service";
import ClickableRow from "../ClickableRow";


const CustomerRow = props => {
  const {id, ssn, sin, givenName, familyName, registeredOn, address, onSelectRow} = props;

  return <ClickableRow className="striped customer-row" onClick={() => onSelectRow(props)}>
    <td><strong>{id}</strong></td>
    <td>{ssn}</td>
    <td>{sin}</td>
    <td>
      {givenName} {familyName}
    </td>
    <td>{formatDateShort(new Date(registeredOn))}</td>
    <td><Address {...address}/></td>
  </ClickableRow>
};
export default CustomerRow;