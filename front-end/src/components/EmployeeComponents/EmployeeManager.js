import React from "react";

export default class EmployeeManager extends React.Component {
  render() {
    const {givenName, familyName} = this.props;
    return `${givenName} ${familyName}`
  }
}