import React from "react";
import RoomManager from "./RoomManager";
import ShowContentButton from "../ShowContentButton";
import Address from "../Address";
import Stars from "../Stars";
import "./HotelManager.css";
import {AsyncItems} from "../AsyncItems";


export default class HotelManager extends React.Component {
  state = {
    loadingRooms: true,
    rooms: []
  };

  loadRooms = async () => {
    try {
      const {id, hotelChainName} = this.props;
      const response = await fetch(`/api/hotel-chains/${hotelChainName}/${id}/rooms`);
      if (!response.ok) {
        throw new Error(`Unable to fetch rooms code: [${response.status}]`);
      }
      const rooms = await response.json();
      this.setState({rooms, loadingRooms: false});
    } catch (error) {
      this.setState({loadingRooms: false});
      // Todo: Show Error message
      throw error;
    }
  };

  render() {
    return <form className="HotelManager">
      <div className="HotelManager__header">
        <h5 className="HotelManager__header-title">
          <Address {...this.props.address}/>
        </h5>
        <div className="HotelManager__header-field">
          <strong>Manager: </strong>
          {this.props.manager.givenName} {this.props.manager.familyName}
        </div>
        <div className="HotelManager__header-end">
          <Stars number={this.props.category} name="radio stars"/>
        </div>
      </div>

      <ShowContentButton
        className="btn"
        buttonLabel="Show rooms"
        onClick={this.loadRooms}>
        <table className="HotelManager__room-table">
          <thead>
            <tr className="HotelManager__room-table__heading">
              <th>Room Number</th>
              <th>Price</th>
              <th>Capacity</th>
              <th>View</th>
              <th>Amenities</th>
              <th>Damages</th>
            </tr>
          </thead>
          <tbody>
            <AsyncItems loading={this.state.loadingRooms} TextWrapper="tr">
              {this.state.rooms.map(room =>
                <RoomManager key={room.roomNumber} {...room}/>)}
            </AsyncItems>
          </tbody>
        </table>
      </ShowContentButton>
    </form>
  }
}