import React from "react";
import ReactForm from "../ReactForm";
import PersonFields from "../PersonFields";
import {toast} from "react-toastify";
import ListInput from "../ListInput";

export default class EmployeeForm extends ReactForm {
  constructor(props) {
    super(props);
    const {id, ssn, sin, givenName, familyName, hotelChainName, roles, address} = props.employee;
    this.state = {
      givenName, familyName, hotelChainName, roles, ...address,
      sin: sin || "", ssn: ssn || ""
    };
    this.employeeId = id;
    this.addressId = address.id;
  }

  onSubmit = async event => {
    event.preventDefault();
    const {ssn, sin, givenName, familyName, hotelChainName, roles, ...address} = this.state;
    const employee = {ssn, sin, givenName, familyName, hotelChainName, roles, address: {
      ...address, id: this.addressId
    }};
    try {
      await this.props.onSubmit(employee);
    } catch (error) {
      toast.error(error.message);
    }
  };

  render() {
    return <form onSubmit={this.onSubmit}>
      <fieldset disabled={this.props.disabled} className="vertical-form simple-form">
        <label>
          Hotel Chain
          <input type="text"
                 disabled
                 value={this.state.hotelChainName}/>
        </label>

        <PersonFields state={this.state} onChange={this.handleInputChange}/>

        <ListInput label="Roles"
                   name="roles"
                   value={this.state.roles || []}
                   onChange={this.handleInputChange}>
          <input type="text"/>
        </ListInput>

        {this.props.disabled ||
        <button type="submit" className="btn btn--inline fill">
          Save
        </button>}
      </fieldset>
    </form>
  }
}