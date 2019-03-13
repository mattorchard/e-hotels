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

  addRoom = (hotel, onComplete) =>
    this.setState({addingRoom: true, hotel, onComplete});

  openRoom = (room, onComplete) =>
    this.setState({roomOpen: true, room, onComplete});


  onComplete = () => this.setState(({onComplete}) => {
    if (onComplete) {
      onComplete();
    }
    return {onComplete: null}
  });


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
    room: null,
    // Modal callback
    onComplete: null
  };

  render() {
    const {
      addingHotel, editingHotel, deletingHotel, addingRoom, roomOpen,
      hotelChainName, hotel, room
    } = this.state;
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
        hotel={hotel}
        isOpen={addingRoom}
        onComplete={this.onComplete}
        onRequestClose={() => this.setState({addingRoom: false, hotel: null})}/>
      <RoomModal
        isOpen={roomOpen}
        room={room}
        onComplete={this.onComplete}
        onRequestClose={() => this.setState({roomOpen: false, room: null})}/>
    </HotelModalContext.Provider>
  }
}