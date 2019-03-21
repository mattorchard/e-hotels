import React from "react";
import HotelModalContext from "./HotelModalContext";
import AddHotelModal from "./HotelModals/AddHotelModal";
import EditHotelModal from "./HotelModals/EditHotelModal";
import DeleteHotelModal from "./HotelModals/DeleteHotelModal";
import AddRoomModal from "./HotelModals/AddRoomModal";
import RoomModal from "./HotelModals/RoomModal";
import DeleteHotelChainModal from "./HotelModals/DeleteHotelChainModal";

export default class HotelModalProvider extends React.Component {

  addHotel = (hotelChainName, onComplete) =>
    this.setState({addingHotel: true, hotelChainName, onComplete});

  editHotel = (hotel, onComplete) =>
    this.setState({editingHotel: true, hotel, onComplete});

  deleteHotel = (hotel, onComplete) =>
    this.setState({deletingHotel: true, hotel, onComplete});

  addRoom = (hotel, onComplete) =>
    this.setState({addingRoom: true, hotel, onComplete});

  openRoom = (room, onComplete) =>
    this.setState({roomOpen: true, room, onComplete});

  deleteHotelChain = hotelChainName =>
    this.setState({
      hotelChainName,
      deletingHotelChain: true,
      onComplete: () => setTimeout(() => window.location.reload(), 650)});



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
    openRoom: this.openRoom,
    deleteHotelChain: this.deleteHotelChain,
  };

  state = {
    // Modal open state
    addingHotel: false,
    editingHotel: false,
    deletingHotel: false,
    addingRoom: false,
    roomOpen: false,
    deletingHotelChain: false,
    // Modal data
    hotelChainName: null,
    hotel: null,
    room: null,
    // Modal callback
    onComplete: null
  };

  render() {
    const {
      addingHotel, editingHotel, deletingHotel, addingRoom, roomOpen, deletingHotelChain,
      hotelChainName, hotel, room
    } = this.state;
    return <HotelModalContext.Provider value={this.contextFunctions}>
      {this.props.children}
      <AddHotelModal
        isOpen={addingHotel}
        hotelChainName={hotelChainName}
        onComplete={this.onComplete}
        onRequestClose={() => this.setState({addingHotel: false, hotelChainName: null})}/>
      <EditHotelModal
        isOpen={editingHotel}
        hotel={hotel}
        onComplete={this.onComplete}
        onRequestClose={() => this.setState({editingHotel: false, hotel: null})}/>
      <DeleteHotelModal
        isOpen={deletingHotel}
        hotel={hotel}
        onComplete={this.onComplete}
        onRequestClose={() => this.setState({deletingHotel: false, hotel: null})}/>
      <AddRoomModal
        isOpen={addingRoom}
        hotel={hotel}
        onComplete={this.onComplete}
        onRequestClose={() => this.setState({addingRoom: false, hotel: null})}/>
      <RoomModal
        isOpen={roomOpen}
        room={room}
        onComplete={this.onComplete}
        onRequestClose={() => this.setState({roomOpen: false, room: null})}/>
      <DeleteHotelChainModal
        isOpen={deletingHotelChain}
        hotelChainName={hotelChainName}
        onComplete={this.onComplete}
        onRequestClose={() => this.setState({deletingHotelChain: false, hotelChainName: null})}/>
    </HotelModalContext.Provider>
  }
}