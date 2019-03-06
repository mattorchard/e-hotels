import React from "react";
import ShowContentButton from "../ShowContentButton";
import {AsyncItems} from "../AsyncItems";
import BookingRow from "./BookingRow";
import {toast} from "react-toastify";

export default class BookingsTable extends React.Component {
  state = {
    bookings: [],
    loadingBookings: false
  };

  loadBookings = async() => {
    try {
      this.setState({loadingBookings: true});
      const {hotelChainName, hotelId} = this.props;
      const response = await fetch(`/api/hotel-chains/${hotelChainName}/${hotelId}/bookings`);
      if (!response.ok) {
        throw new Error(`Unable to fetch bookings [${response.status}]`);
      }
      const bookings = await response.json();
      this.setState({bookings, loadingBookings: false});
    } catch (error) {
      console.error("Unable to fetch bookings", error);
      toast.error("Unable to fetch bookings");
      this.setState({loadingBookings: false});
      throw error;
    }
  };


  render() {
    return <ShowContentButton
      onClick={this.loadBookings}
      buttonLabel="Show Bookings"
      className="btn">
      <table>
        <thead>
        <tr>
          <td>ID</td>
        </tr>
        </thead>
        <tbody>
        <AsyncItems wrapper="table" loading={this.state.loadingBookings}>
          {this.state.bookings.map(booking =>
            <BookingRow key={booking.id} booking={booking}/>)}
        </AsyncItems>
        </tbody>
      </table>
    </ShowContentButton>
  }
}