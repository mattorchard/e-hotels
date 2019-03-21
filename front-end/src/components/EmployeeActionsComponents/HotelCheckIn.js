import React from "react";
import Address from "../Address";
import Stars from "../Stars";
import CreateRental from "./CreateRental";
import CheckInModal from "./CheckInModal";


export default class HotelCheckIn extends React.Component {

  state = {
    creatingRenting: false,
    checkingIn: false
  };

  render() {
    const {hotel, hotelChainName, employeeId, numberOfUpcomingBookings: numBookings, onRequestReload} = this.props;
    const {category, address, manager} = hotel;
    const {creatingRenting, checkingIn} = this.state;

    return <section className="large-card">
      <div className="check-in-card__head">
        <div>
          <strong><Address {...address}/></strong>
          <div>
            Manager: {manager.givenName} {manager.familyName}
          </div>
          <Stars disabled number={category}/>
        </div>
        <button onClick={() => this.setState({checkingIn: true})}
                disabled={!numBookings}
                title={numBookings ? "" : "No upcoming bookings for this hotel"}
                type="button"
                className="btn fill">
          Check In {numBookings ?
          <span title={`${numBookings} upcoming bookings`}>
            ({numBookings})
          </span> : ""}
        </button>
      </div>
      {creatingRenting ?
        <CreateRental
          hotelId={hotel.id}
          hotelChainName={hotelChainName}
          employeeId={employeeId}
          onRequestClose={() => this.setState({creatingRenting: false})}/> :
        <button
          type="button"
          className="btn"
          onClick={() => this.setState({creatingRenting: true})}>
          Rent without booking
        </button>}

      <CheckInModal
        isOpen={checkingIn}
        hotelId={hotel.id}
        hotelChainName={hotelChainName}
        employeeId={employeeId}
        onRequestClose={() => this.setState({checkingIn: false})}
        onRequestReload={onRequestReload}/>

    </section>
  }
}