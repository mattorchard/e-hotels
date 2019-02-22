import React from "react";
import HotelManager from "./HotelManager";
import {AsyncList} from "../AsyncList";
import ShowContentButton from "../ShowContentButton";
import Address from "../Address";

export default class HotelChainManager extends React.Component {
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
      <h3>{this.props.name}</h3>
      <Address {...this.props.address} />
      <ShowContentButton
        buttonLabel="Show Hotels"
        className="btn"
        onClick={this.loadHotels}>
        <h4>Hotels</h4>
        <AsyncList loading={this.state.loadingHotels}>
          {this.state.hotels.map(hotel => <li key={hotel.id}><HotelManager {...hotel}/></li>)}
        </AsyncList>
      </ShowContentButton>
    </>;
  }
}