import React from "react";
import Address from "../Address";
import ClickableRow from "../ClickableRow";

export default class HotelResult extends React.Component {


  render() {
    const {onClick} = this.props;
    const {address, category, rooms} = this.props.hotel;
    return <>
      <Address {...address}/>
      <table>
        <tbody>
          {rooms.map((room) =>
            <ClickableRow onClick={() => onClick(room)}>
              <td>{room.roomNumber}</td>
            </ClickableRow>)}
        </tbody>
      </table>
    </>
  }
}