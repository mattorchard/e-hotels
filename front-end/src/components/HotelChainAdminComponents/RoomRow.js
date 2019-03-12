import React from "react";
import ExpandingList from "../ExpandingList";
import ClickableRow from "../ClickableRow";


export default class RoomRow extends React.Component {
  render() {
    const {roomNumber, price, capacity, extendable, scenery, amenities, damages} = this.props.room;

    return <ClickableRow className="striped" onClick={() => this.props.onClick(this.props.room)}>
      <td>
        <strong>#{roomNumber}</strong>
      </td>
      <td>
        ${price}
      </td>
      <td>
        {capacity}<span title="Extendable">{extendable && "+"}</span>
      </td>
      <td>
        {scenery}
      </td>
      <td>
        <ul>
          <ExpandingList>
            {amenities.map(amenity => <li key={amenity}>{amenity}</li>)}
          </ExpandingList>
        </ul>
      </td>
      <td>
        <ul>
          <ExpandingList>
            {damages.map(damage => <li key={damage}>{damage}</li>)}
          </ExpandingList>
        </ul>
      </td>
    </ClickableRow>
  }
}