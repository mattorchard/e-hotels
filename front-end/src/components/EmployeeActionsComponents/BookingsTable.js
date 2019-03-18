import React from "react";
import {AsyncItems} from "../AsyncItems";
import ClickableRow from "../ClickableRow";
import {formatDateShort} from "../../services/format-service";

export default class BookingsTable extends React.Component {

  render() {
    const {bookings, loadingBookings, selectedBooking, onSelectBooking} = this.props;
    return <table className="table-spaced">
      <thead className="table-head">
      <tr>
        <td>Room</td>
        <td>Customer</td>
        <td>Start Date</td>
        <td>End Date</td>
      </tr>
      </thead>
      <tbody>
      <AsyncItems wrapper="table" loading={loadingBookings} placeholderMessage="No bookings">
        {bookings.map(booking =>
          <ClickableRow
            key={booking.id}
            onClick={() => onSelectBooking(booking)}
            className={"striped row-top " + (selectedBooking && selectedBooking.id === booking.id ? "selected-row" : "")}>
            <td>{booking.roomNumber}</td>
            <td>{booking.customer.givenName} {booking.customer.familyName}</td>
            <td>{formatDateShort(new Date(booking.startDate))}</td>
            <td>{formatDateShort(new Date(booking.endDate))}</td>
          </ClickableRow>)}
      </AsyncItems>
      </tbody>
    </table>
  }
}