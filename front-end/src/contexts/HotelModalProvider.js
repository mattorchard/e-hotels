import React from "react";
import HotelModalContext from "./HotelModalContext";
import AddHotelModal from "./HotelModals/AddHotelModal";
import EditHotelModal from "./HotelModals/EditHotelModal";
import DeleteHotelModal from "./HotelModals/DeleteHotelModal";
import AddRoomModal from "./HotelModals/AddRoomModal";
import RoomModal from "./HotelModals/RoomModal";

export default class HotelModalProvider extends React.Component {

  addHotel = hotelChainName => {
    console.log("Add Hotel", hotelChainName);
  };

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
    addHotel: this.addHotel,
    editHotel: this.editHotel,
    deleteHotel: this.deleteHotel,
    addRoom: this.addRoom,
    openRoom: this.openRoom
  };

  state = {
    // Modal open state
    addingHotel: false,
    editingHotel: false,
    deletingHotel: false,
    addingRoom: false,
    roomOpen: false,
    // Modal data
    hotelChainName: null,
    hotel: null,
    room: null
  };

  render() {
    const {addingHotel, editingHotel, deletingHotel, addingRoom, roomOpen} = this.state;
    return <HotelModalContext.Provider value={this.contextFunctions}>
      {this.props.children}
      <AddHotelModal
        isOpen={addingHotel}
        onRequestClose={() => this.setState({addingHotel: false, hotelChainName: null})}/>
      <EditHotelModal
        isOpen={editingHotel}
        onRequestClose={() => this.setState({editingHotel: false, hotel: null})}/>
      <DeleteHotelModal
        isOpen={deletingHotel}
        onRequestClose={() => this.setState({deletingHotel: false, hotel: null})}/>
      <AddRoomModal
        isOpen={addingRoom}
        onRequestClose={() => this.setState({addingRoom: false, hotel: null})}/>
      <RoomModal
        isOpen={roomOpen}
        onRequestClose={() => this.setState({roomOpen: false, room: null})}/>
    </HotelModalContext.Provider>
  }
}