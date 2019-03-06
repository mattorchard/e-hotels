import React from "react";
import Address from "../Address";
import Stars from "../Stars";
import CreateRenting from "./CreateRenting";


export default class HotelCheckIn extends React.Component {

  state = {
    creatingRenting: false
  };

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
        <button
          type="button"
          className="btn fill">
          Check In
        </button>
      </div>
      {this.state.creatingRenting ?
        <CreateRenting
          hotelId={hotel.id}
          hotelChainName={hotelChainName}
          onRequestClose={() => this.setState({creatingRenting: false})}/> :
        <button
          type="button"
          className="btn"
          onClick={() => this.setState({creatingRenting: true})}>
          Rent without booking
        </button>}

    </section>
  }
}