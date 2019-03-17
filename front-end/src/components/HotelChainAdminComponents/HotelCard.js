import React from "react";
import RoomRow from "./RoomRow";
import Address from "../Address";
import Stars from "../Stars";
import {AsyncItems} from "../AsyncItems";
import ContactInfo from "../ContactInfo";
import HotelModalContext from "../../contexts/HotelModalContext";


export default class HotelCard extends React.Component {
  static contextType = HotelModalContext;
  state = {
    showingRooms: false,
    loadingRooms: false,
    rooms: []
  };

  loadRooms = async () => {
    try {
      this.setState({showingRooms: true, loadingRooms: true});
      const {id, hotelChainName} = this.props.hotel;
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
    const {reloadHotels} = this.props;
    const {address, emailAddresses, phoneNumbers, category, manager} = this.props.hotel;
    const {showingRooms, loadingRooms, rooms} = this.state;
    const {editHotel, deleteHotel, addRoom, openRoom} = this.context;

    return <div className="large-card">
      <div className="hotel-card__head ">
        <div>
          <h3 className="hotel-card__title">
            <Address {...address}/>
          </h3>
          Manager: {manager.givenName} {manager.familyName}
        </div>

        <ContactInfo phoneNumbers={phoneNumbers} emailAddresses={emailAddresses}/>
        <Stars number={category} disabled/>
      </div>

      <div className="hotel-card__actions">
        {showingRooms
          ? <button onClick={() => addRoom(this.props.hotel, this.loadRooms)}
                    className="btn"
                    type="button">
            Add Room
          </button>
          : <button onClick={this.loadRooms}
                    className="btn"
                    type="button">
            Show Rooms
          </button>}
        <button onClick={() => editHotel(this.props.hotel)}
                className="btn"
                type="button">
          Edit Hotel
        </button>
        <button onClick={() => deleteHotel(this.props.hotel, reloadHotels)}
                className="btn"
                type="button">
          Delete Hotel
        </button>
      </div>

      {showingRooms && <div className="horizontal-scroll">
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
          <AsyncItems loading={loadingRooms} wrapper="table">
            {rooms.map(room =>
              <RoomRow key={room.roomNumber} room={room} onClick={room => openRoom(room, this.loadRooms)}/>)}
          </AsyncItems>
          </tbody>
        </table>
      </div>}
    </div>
  }
}