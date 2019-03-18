import React from "react";
import Address from "../Address";
import ClickableRow from "../ClickableRow";
import Stars from "../Stars";

export default class HotelResult extends React.Component {


  render() {
    const {onSelectRoom} = this.props;
    const {address, category, rooms, hotelChainName, numRooms, capacity} = this.props.hotel;
    return <div className="large-card">
      <dl className="hotel-search-result__head horizontal-dl">
        <dt>Chain</dt>
        <dd>{hotelChainName}</dd>
        <dt>Address</dt>
        <dd><Address {...address}/></dd>
        <dt>Total Rooms</dt>
        <dd>{numRooms}</dd>
        <dt>Capacity</dt>
        <dd>{capacity}</dd>
        <dt>Category</dt>
        <dd>
          <Stars number={category} disabled/>
        </dd>
      </dl>

      <table className="input-table">
        <thead className="">
        <tr>
          <th>Room</th>
          <th>Price</th>
          <th>Capacity</th>
          <th>Scenery</th>
        </tr>
        </thead>
        <tbody>
        {rooms.map((room) =>
          <ClickableRow className="striped row-top"
                        key={room.roomNumber}
                        onClick={() => onSelectRoom(room)}>
            <td>{room.roomNumber}</td>
            <td>${room.price}</td>
            <td>
              {room.capacity}{room.extendable && <span title="Extendable">+</span>}
            </td>
            <td>{room.scenery}</td>
          </ClickableRow>)}
        </tbody>
      </table>
    </div>
  }
}