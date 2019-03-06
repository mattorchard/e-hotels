import React from "react";
import Address from "../Address";
import Stars from "../Stars";
import BookingsTable from "./BookingsTable";


export default class HotelCheckIn extends React.Component {
  render() {
    const {hotel, hotelChainName} = this.props;
    const {category, address, manager} = hotel;
    return <section className="large-card">
      <div className="check-in-card__head">
        <div>
          <strong><Address {...address}/></strong>
          <div>
            Manager: {manager.givenName} {manager.familyName}
          </div>
          <form>
            <Stars disabled number={category} name="radio-stars"/>
          </form>
        </div>
        <button type="button" className="btn fill">
          Rent without booking
        </button>
      </div>
      <BookingsTable hotelChainName={hotelChainName} hotelId={hotel.id}/>
    </section>
  }
}