import React from "react";


export default class BookingRow extends React.Component {

  render() {
    const {id} = this.props.booking;
    return <tr>
      <td>{id}</td>
    </tr>
  }
}