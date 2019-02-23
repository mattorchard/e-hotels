import React from "react";
import "./RoomManager.css"


export default class RoomManager extends React.Component {
  render() {
    return <div className="RoomManager">
      <strong>Room #{this.props.roomNumber}</strong>
      <dl className="horizontal-dl">
        <dt>Price:</dt>
        <dd>
          ${this.props.price}
        </dd>
        <dt>Capacity:</dt>
        <dd>
          {this.props.capacity}<span title="Extendable">{this.props.extendable && "+"}</span>
        </dd>
        <dt>Scenery:</dt>
        <dd>
          {this.props.scenery}
        </dd>
        <dt>Amenities:</dt>
        <dd>
          {this.props.amenities.join(" ")}
        </dd>
        <dt>Damages:</dt>
        <dd>
          {this.props.damages.join(" ")}
        </dd>
      </dl>
    </div>
  }
}