import React from "react";
import HotelManager from "./HotelManager";
import {simulateDelay} from "../../services/simulator-service";
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
    await simulateDelay(1000);
    const hotels = [{id: 2}];
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
        <strong>Hotels</strong>
        <AsyncList loading={this.state.loadingHotels}>
          {this.state.hotels.map(hotel => <li key={hotel.id}><HotelManager {...hotel}/></li>)}
        </AsyncList>
      </ShowContentButton>
    </>;
  }
}