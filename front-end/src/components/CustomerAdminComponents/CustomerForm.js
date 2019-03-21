import React from "react";
import ReactForm from "../ReactForm";
import {toast} from "react-toastify";
import PersonFields from "../PersonFields";

export default class CustomerForm extends ReactForm {
  constructor(props) {
    super(props);
    if (props.initialCustomer) {
      const {givenName, familyName, ssn, sin, address} = props.initialCustomer;
      this.state = {
        givenName, familyName, ...address,
        ssn: ssn || "", sin: sin || ""
      };
    } else {
      this.state = {
        givenName: "",
        familyName: "",
        ssn: "",
        sin: "",
        streetName: "",
        streetNumber: "",
        city: "",
        country: ""
      }
    }
  }

  onSubmit = async event => {
    event.preventDefault();
    const {givenName, familyName, ssn, sin, ...address} = this.state;
    const addressId = this.props.initialCustomer && this.props.initialCustomer.address.id;
    const customer = {
      givenName,
      familyName,
      ssn: ssn ? ssn : null,
      sin: sin ? sin : null,
      address: {...address}
    };
    try {
      await this.props.onSubmit(customer);
    } catch (error) {
      toast.error(error.message);
    }
  };

  render() {
    return <form onSubmit={this.onSubmit}>
      <fieldset disabled={this.props.disabled} className="vertical-form simple-form">
        <PersonFields state={this.state} onChange={this.handleInputChange}/>
        {this.props.disabled ||
        <button type="submit" className="btn btn--inline">
          Save
        </button>}
      </fieldset>
    </form>
  }
}
