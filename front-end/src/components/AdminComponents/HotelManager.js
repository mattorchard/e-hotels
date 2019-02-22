import React from "react";
import {simulateDelay} from "../../services/simulator-service";
import {AsyncList} from "../AsyncList";
import RoomManager from "./RoomManager";
import ShowContentButton from "../ShowContentButton";
import Address from "../Address";
import Stars from "../Stars";


export default class HotelManager extends React.Component {
  state = {
    loadingRooms: true,
    rooms: []
  };

  loadRooms = async () => {
    await simulateDelay(1000);
    const rooms = [{number: 303}];
    this.setState({rooms, loadingRooms: false});
  };

  render() {
    return <form>
      <h5>
        <Address {...this.props.address}/>
      </h5>
      <Stars number={this.props.category} name="radio stars"/>

      <ShowContentButton
        className="btn"
        buttonLabel="Show rooms"
        onClick={this.loadRooms}>
        <h6>Rooms</h6>
        <AsyncList loading={this.state.loadingRooms}>
          {this.state.rooms.map(room =>
            <li key={room.number}><RoomManager {...room}/></li>)}
        </AsyncList>
      </ShowContentButton>
    </form>
  }
}