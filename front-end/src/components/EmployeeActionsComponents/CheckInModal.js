import React from "react";
import {toast} from "react-toastify";
import ReactModal from "react-modal";
import BookingsTable from "./BookingsTable";
import AsyncButton from "../AsyncButton";

export default class CheckInModal extends React.Component {

  state = {
    loadingBookings: false,
    bookings: [],
    selectedBooking: null,
    hasPerformedCheckIn: false
  };

  loadBookings = async () => {
    const {hotelChainName, hotelId} = this.props;
    try {
      this.setState({selectedBooking: null, loadingBookings: true});
      const response = await fetch(`/api/hotel-chains/${hotelChainName}/${hotelId}/bookings`);
      if (!response.ok) {
        throw new Error(`Unable to fetch bookings ${response.status}`);
      }
      const bookings = await response.json();
      this.setState({bookings, loadingBookings: false});
    } catch (error) {
      console.error(error);
      toast.error("Unable to load bookings");
      this.props.onRequestClose();
    }
  };

  checkIn = async () => {
    const {employeeId} = this.props;
    const {selectedBooking} = this.state;
    const {customer} = selectedBooking;
    try {
      const query = new URLSearchParams();
      query.append("employeeId", employeeId);
      const response = await fetch(`/api/bookings/${selectedBooking.id}/check-in?${query}`, {method: "POST",});
      if (!response.ok) {
        if (response.status === 404) {
          toast.error("Booking not found");
        }
        throw new Error(`Unable to check in ${response.status}`);
      }
      toast.success(`${customer.givenName} ${customer.familyName} has been checked in sucessfully`);
      this.setState({hasPerformedCheckIn: true});
      // Fire off loading (but do not await as to let the button spinner disappear)
      // noinspection JSIgnoredPromiseFromCall
      this.loadBookings();
    } catch(error) {
      console.error("Unable to check in user");
      toast.error("Unable to save check in");
    }
  };

  handleCloseRequest = () => {
    this.props.onRequestClose();
    if (this.state.hasPerformedCheckIn) {
      this.props.onRequestReload();
    }
  };

  render() {
    const {isOpen} = this.props;
    const {selectedBooking, loadingBookings, bookings} = this.state;
    return <ReactModal
      isOpen={isOpen}
      onRequestClose={this.handleCloseRequest}
      onAfterOpen={this.loadBookings}
      appElement={document.getElementById('root')}
      className="modal-fit-content">
      <h3 className="check-in-modal__head">Check In</h3>
      <BookingsTable
        bookings={bookings}
        loadingBookings={loadingBookings}
        selectedBooking={selectedBooking}
        onSelectBooking={booking => this.setState({selectedBooking: booking})}/>

      <div>
        <AsyncButton onClick={this.checkIn}
                disabled={!Boolean(selectedBooking)}
                type="button"
                className="btn fill btn--inline">
          Check In
        </AsyncButton>

        <button onClick={this.handleCloseRequest}
                type="button"
                className="btn btn--inline">
          Cancel
        </button>
      </div>
    </ReactModal>
  }
}