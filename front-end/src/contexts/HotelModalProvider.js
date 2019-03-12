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

  contextFunctions = {
    addHotel: this.editHotel,
    editHotel: this.editHotel,
    deleteHotel: this.deleteHotel,
    addRoom: this.addRoom,
    openRoom: this.openRoom
  };

  state = {
    addingHotel: false,
    editingHotel: false,
    deletingHotel: false,
    addingRoom: false,
    selectedRoom: null
  };

  render() {
    const {} = this.state;
    return <HotelModalContext.Provider value={this.contextFunctions}>
      {this.props.children}

    </HotelModalContext.Provider>
  }
}