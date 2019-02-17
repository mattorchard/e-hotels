import React from "react";
import {simulateDelay} from "../../services/simulator-service";
import {AsyncList} from "../AsyncList";
import RoomManager from "./RoomManager";
import ShowContentButton from "../ShowContentButton";


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
    return <>
      <h4>Hotel Name</h4>
      <ShowContentButton
        buttonLabel="Show rooms"
        onClick={this.loadRooms}>
        <strong>Rooms</strong>
        <AsyncList loading={this.state.loadingRooms}>
          {this.state.rooms.map(room =>
            <li key={room.number}><RoomManager {...room}/></li>)}
        </AsyncList>
      </ShowContentButton>
    </>
  }
}