import React from "react";
import HotelModalContext from "./HotelModalContext";

export default class HotelModalProvider extends React.Component {

  editHotel = hotel => {
    console.log("Edit Hotel", hotel);
  };

  deleteHotel = hotel => {
    console.log("Delete Hotel", hotel);
  };

  addRoom = hotel => {
    console.log("Add room", hotel);
  };

  openRoom = room => {
    console.log("Open room", room);
  };

  state = {
    editHotel: this.editHotel,
    deleteHotel: this.deleteHotel,
    addRoom: this.addRoom,
    openRoom: this.openRoom
  };

  render() {
    return <HotelModalContext.Provider value={this.state}>
      {this.props.children}
    </HotelModalContext.Provider>
  }
}