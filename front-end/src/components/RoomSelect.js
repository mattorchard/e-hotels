import React from "react";
import ClickableRow from "./ClickableRow";


export default class RoomSelect extends React.Component {

  render() {
    const {rooms, value, onChange, placeholder} = this.props;
    return <>
      <input type="number"
             value={value}
             required
             onChange={() => {}}
             className="hidden-input"
             aria-label="Select a room"/>
      <table className="input-table">
        <thead className="room-select__head">
        <tr>
          <th>Room Number</th>
          <th>Price</th>
          <th>Capacity</th>
          <th>Scenery</th>
        </tr>
        </thead>
        <tbody>
        {rooms.length < 1 && <tr>
          <td colSpan="4">
            {placeholder}
          </td>
        </tr>}
        {rooms.map(({roomNumber, price, capacity, extendable, scenery}) =>
          <ClickableRow
            key={roomNumber}
            className={"striped " + (roomNumber === value ? "selected-row" : "")}
            onClick={() => onChange(roomNumber)}>

            <td><strong>{roomNumber}</strong></td>
            <td>{price}</td>
            <td>
              {capacity}
              {extendable && <span title="Extendable">+</span>}
            </td>
            <td>
              {scenery}
            </td>
          </ClickableRow>)}
        </tbody>
      </table>
    </>
  }
}