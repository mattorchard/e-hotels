import React from "react";
import HotelManager from "./HotelManager";
import {simulateDelay} from "../../services/simulator-service";
import {AsyncList} from "../AsyncList";
import ShowContentButton from "../ShowContentButton";

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
      <h3>Hotel Chain Name</h3>
      <ShowContentButton
        buttonLabel="Show Hotels"
        onClick={this.loadHotels}>
        <strong>Hotels</strong>
        <AsyncList loading={this.state.loadingHotels}>
          {this.state.hotels.map(hotel => <li key={hotel.id}><HotelManager {...hotel}/></li>)}
        </AsyncList>
      </ShowContentButton>
    </>;
  }
}