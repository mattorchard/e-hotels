import React from "react";
import HotelCard from "./HotelCard";
import ShowContentButton from "../ShowContentButton";
import Address from "../Address";
import {AsyncItems} from "../AsyncItems";

export default class HotelChainItem extends React.Component {
  state = {
    loadingHotels: false,
    hotels: []
  };

  loadHotels = async () => {
    this.setState({loadingHotels: true});
    const response = await fetch(`/api/hotel-chains/${this.props.name}/hotels`);
    if (!response.ok) {throw new Error(`Unable to fetch hotels status: [${response.status}]`);}
    const hotels = await response.json();
    this.setState({hotels, loadingHotels: false});
  };

  render() {
    return <>
      <div className="hotel-chain-item__head">
        <h3>{this.props.name}</h3>
        <strong>
          <Address {...this.props.address} />
        </strong>
      </div>
      <ShowContentButton
        buttonLabel="Show Hotels"
        className="btn"
        onClick={this.loadHotels}>
        <h4>Hotels</h4>
        <ul className="rails">
          <AsyncItems loading={this.state.loadingHotels}>
            {this.state.hotels.map(hotel =>
              <li key={hotel.id}><HotelCard {...hotel}/></li>)}
          </AsyncItems>
        </ul>
      </ShowContentButton>
      <hr/>
    </>;
  }
}