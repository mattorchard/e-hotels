import React from "react";
import RoomRow from "./RoomRow";
import ShowContentButton from "../ShowContentButton";
import Address from "../Address";
import Stars from "../Stars";
import {AsyncItems} from "../AsyncItems";


export default class HotelCard extends React.Component {
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
    return <form className="large-card">
      <div className="hotel-card__head">
        <h5 className="hotel-card__title">
          <Address {...this.props.address}/>
        </h5>
        <div className="hotel-card__head__field">
          <strong>Manager: </strong>
          {this.props.manager.givenName} {this.props.manager.familyName}
        </div>
        <div className="hotel-card__head__end">
          <Stars number={this.props.category} name="radio-stars"/>
        </div>
      </div>

      <ShowContentButton
        className="btn"
        buttonLabel="Show rooms"
        onClick={this.loadRooms}>
        <div className="horizontal-scroll">
          <table className="hotel-card__room-table table-spaced">
            <thead>
            <tr className="hotel-card__room-table__head">
              <th>Room Number</th>
              <th>Price</th>
              <th>Capacity</th>
              <th>View</th>
              <th>Amenities</th>
              <th>Damages</th>
            </tr>
            </thead>
            <tbody>
            <AsyncItems loading={this.state.loadingRooms} wrapper="table">
              {this.state.rooms.map(room =>
                <RoomRow key={room.roomNumber} {...room}/>)}
            </AsyncItems>
            </tbody>
          </table>
        </div>
      </ShowContentButton>
    </form>
  }
}