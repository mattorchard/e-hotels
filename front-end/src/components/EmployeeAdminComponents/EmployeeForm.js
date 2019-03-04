import React from "react";
import ReactForm from "../ReactForm";
import PersonFields from "../PersonFields";
import {toast} from "react-toastify";

export default class EmployeeForm extends ReactForm {
  constructor(props) {
    super(props);
    const {id, ssn, sin, givenName, familyName, hotelChainName, address} = props.employee;
    this.state = {
      id, givenName, familyName, hotelChainName, ...address,
      sin: sin || "", ssn: ssn || ""
    };
  }

  onSubmit = event => {
    event.preventDefault();
    const {id, ssn, sin, givenName, familyName, hotelChainName, ...address} = this.state;
    const employee = {id, ssn, sin, givenName, familyName, hotelChainName, address};
    try {
      this.props.onSubmit(employee);
    } catch (error) {
      toast.error("Unable to save employee");
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

        <PersonFields state={this.state} handleInputChange={this.handleInputChange}/>

        {this.props.disabled ||
        <button type="submit" className="btn fill">
          Save
        </button>}
      </fieldset>
    </form>
  }
}