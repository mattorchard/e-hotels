import React from "react";
import "./RoomManager.css"


export default class RoomManager extends React.Component {
  render() {
    return <tr className="RoomManager">
      <td>
        <strong>#{this.props.roomNumber}</strong>
      </td>
      <td>
        ${this.props.price}
      </td>
      <td>
        {this.props.capacity}<span title="Extendable">{this.props.extendable && "+"}</span>
      </td>
      <td>
        {this.props.scenery}
      </td>
      <td>
        {this.props.amenities.join(" ")}
      </td>
      <td>
        {this.props.damages.join(" ")}
      </td>
    </tr>
  }
}