import React from "react";
import ReactForm from "../ReactForm";
import PersonFields from "../PersonFields";

export default class EmployeeForm extends ReactForm {
  constructor(props) {
    super(props);
    const {id, ssn, sin, givenName, familyName, hotelChainName, address} = props.employee;
    this.state = {
      id, givenName, familyName, hotelChainName, ...address,
      sin: sin || "", ssn: ssn || ""
    };
  }

  render() {
    return <form>
      <fieldset disabled={this.props.disabled} className="vertical-form simple-form">
        <label>
          Hotel Chain
          <input type="text"
                 disabled
                 value={this.state.hotelChainName}/>
        </label>

        <PersonFields state={this.state} handleInputChange={this.handleInputChange}/>

        {/*{JSON.stringify(this.state)}*/}
        {this.props.disabled ||
        <button type="submit" className="btn fill">
          Save
        </button>}
      </fieldset>
    </form>
  }
}