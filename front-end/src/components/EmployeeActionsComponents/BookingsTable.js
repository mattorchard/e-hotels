import React from "react";
import {AsyncItems} from "../AsyncItems";
import ClickableRow from "../ClickableRow";

export default class BookingsTable extends React.Component {


  render() {
    const {bookings, loadingBookings, onSelectBooking} = this.props;
    return <table>
      <thead>
      <tr>
        <td>ID</td>
      </tr>
      </thead>
      <tbody>
      <AsyncItems wrapper="table" loading={loadingBookings}>
        {bookings.map(booking =>
          <ClickableRow key={booking.id} onClick={() => onSelectBooking(booking)}>
            <td>{JSON.stringify(booking)}</td>
          </ClickableRow>)}
      </AsyncItems>
      </tbody>
    </table>
  }
}