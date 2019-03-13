import React from "react";
import ReactModal from "react-modal";
import {toast} from "react-toastify";
import ConfirmationModal from "../../components/ConfirmationModal";
import RoomForm from "./HotelModalComponents/RoomForm";

export default class RoomModal extends React.Component {

  state = {
    confirmingDelete: false,
    editingRoom: false,
  };

  saveRoom = async room => {
    const {hotelChainName, hotelId, roomNumber} = this.props.room;

    try {
      const response = await fetch(`/api/hotel-chains/${hotelChainName}/${hotelId}/${roomNumber}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(room)
      });
      if (!response.ok) {
        throw new Error(`Unable to save room ${response.status}`);
      }
      toast.success(`Room ${roomNumber} was successfully updated`);
      this.props.onComplete();
      this.props.onRequestClose();
    } catch (error) {
      console.error("Unable to update room", error);
      toast.error("Unable to update room");
    }
  };

  deleteRoom = async () => {
    const {hotelChainName, hotelId, roomNumber} = this.props.room;
    try {
      const response = await fetch(`/api/hotel-chains/${hotelChainName}/${hotelId}/${roomNumber}`, {method: "DELETE"});
      if (!response.ok) {
        throw new Error(`Unable to delete room ${response.status}`);
      }
      toast.success(`Room ${roomNumber} was successfully deleted`);
      this.props.onComplete();
      this.props.onRequestClose();
    } catch (error) {
      console.error("Unable to delete room", error);
      toast.error("Unable to delete room");
    }
  };

  render() {
    const {isOpen, onRequestClose, room} = this.props;
    const {confirmingDelete, editingRoom} = this.state;
    return <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onAfterOpen={() => this.setState({confirmingDelete: false, editingRoom: false})}
      appElement={document.getElementById('root')}
      className="modal-fit-content">
      {isOpen && <>
        <div className="modal-actions">
          {!editingRoom && <>
            <button onClick={() => this.setState({editingRoom: true})}
                    type="button"
                    className="btn btn--inline fill">
              Edit
            </button>
            <button onClick={() => this.setState({confirmingDelete: true})}
                    type="button"
                    className="btn btn--inline">
              Delete
            </button>
          </>}
          <button onClick={onRequestClose}
                  type="button"
                  className="btn btn--inline">
            Cancel
          </button>
        </div>

        <RoomForm
          room={room}
          disabled={!editingRoom}
          roomNumberDisabled
          onSubmit={this.saveRoom}>
          {editingRoom && <button type="submit" className="btn btn--inline fill">
            Save
          </button>}
        </RoomForm>

        <ConfirmationModal
          isOpen={confirmingDelete}
          onCancel={() => this.setState({confirmingDelete: false})}
          onConfirm={this.deleteRoom}>
          Are you sure you want to delete room {room.roomNumber}
        </ConfirmationModal>
      </>}
    </ReactModal>
  }
}