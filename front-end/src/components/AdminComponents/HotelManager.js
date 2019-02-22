import React from "react";
import {simulateDelay} from "../../services/simulator-service";
import {AsyncList} from "../AsyncList";
import RoomManager from "./RoomManager";
import ShowContentButton from "../ShowContentButton";
import Address from "../Address";


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
      <h5>
        <Address {...this.props.address}/>
      </h5>

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
    </>
  }
}