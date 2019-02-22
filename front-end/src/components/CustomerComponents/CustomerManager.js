import React from "react";


export default class CustomerManager extends React.Component {
  render() {
    const {givenName, familyName} = this.props;
    return <>
      {givenName} {familyName}
      <div>
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