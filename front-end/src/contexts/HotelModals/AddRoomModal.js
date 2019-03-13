import React from "react";
import ReactModal from "react-modal";
import {toast} from "react-toastify";
import RoomForm from "./HotelModalComponents/RoomForm";

export default class AddRoomModal extends React.Component {

  addRoom = async room => {
    const {hotelChainName, id: hotelId} = this.props.hotel;
    try {
      const response = await fetch(`/api/hotel-chains/${hotelChainName}/${hotelId}/rooms`, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(room)
      });
      if (!response.ok) {
        if (response.status === 409) {
          toast.error(`Room number ${room.roomNumber} is already in use for this hotel`)
        }
        throw new Error(`Unable to add room ${response.status}`);
      }
      toast.success(`Room ${room.roomNumber} has been created`);
      this.props.onComplete();
      this.props.onRequestClose();
    } catch (error) {
      console.error(error);
      toast.error("Unable to add room");
    }
  };

  render() {
    const {isOpen, onRequestClose} = this.props;
    return <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      appElement={document.getElementById('root')}
      className="modal-fit-content">
      <h2>Add Room</h2>
      <RoomForm onSubmit={this.addRoom}>
        <button type="submit"
                className="btn fill btn--inline">
          Add a Room
        </button>
        <button type="button"
                className="btn btn--inline"
                onClick={onRequestClose}>
          Cancel
        </button>
      </RoomForm>
    </ReactModal>;
  }
}