import React from "react";


export default class RoomRow extends React.Component {
  render() {
    const {roomNumber, price, capacity, extendable, scenery, amenities, damages} = this.props;
    return <tr className="striped">
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
        {amenities.join(" ")}
      </td>
      <td>
        {damages.join(" ")}
      </td>
    </tr>
  }
}