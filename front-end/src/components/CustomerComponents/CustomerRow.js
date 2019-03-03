import React from "react";
import Address from "../Address";
import {formatDateShort} from "../../services/format-service";
import ClickableRow from "../ClickableRow";
import {Link} from "react-router-dom";


export default class CustomerRow extends React.Component {
  state = {
    selected: false
  };

  selectRow = () => {
    this.setState({selected: true});
    document.addEventListener("click", () => this.setState({selected: false}), {once: true});
  };

  render() {
    const {id, ssn, sin, givenName, familyName, registeredOn, address} = this.props;
    const {selected} = this.state;

    return <ClickableRow
      className={"striped customer-row " + (selected ? "customer-row--selected" : "")}
      onClick={this.selectRow}>

      {selected ?
        <td colSpan="6" className="customer-row__actions">
          <div className="customer-row__actions-row">
            <button type="button" className="btn btn--inline">Edit</button>
            <button type="button" className="btn btn--inline">Delete</button>
            <Link to={`/customer/${id}`} className="btn btn--inline">
              Login&nbsp;as
            </Link>
            <button type="button" className="btn btn--inline">Cancel</button>
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
        </>}
    </ClickableRow>
  }
}