import React from "react";

export default class EmployeeForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <form>
      <fieldset disabled={this.props.disabled}>
      </fieldset>
    </form>
  }
}