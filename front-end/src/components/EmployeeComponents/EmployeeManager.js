import React from "react";

export default class EmployeeManager extends React.Component {
  render() {
    const {givenName, familyName} = this.props;
    return <>
      <form>
        {givenName} {familyName}
      </form>
      <div>
        <button type="button"
                className="btn">
          Check In
        </button>
        <button type="button"
                className="btn">
          Edit
        </button>
        <button type="button"
                className="btn">
          Delete
        </button>
      </div>
    </>
  }
}