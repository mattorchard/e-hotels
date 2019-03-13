import React from "react";
import ReactModal from "react-modal";
import {toast} from "react-toastify";
import ConfirmationModal from "../../components/ConfirmationModal";

export default class RoomModal extends React.Component {

  state = {
    confirmingDelete: false,
    editingRoom: false,
  };

  async saveRoom() {
    toast.warn("Feature not implemented");
  }

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
    } catch(error) {
      console.error("Unable to delete room", error);
      toast.error("Unable to delete room");
    }
  };

  render() {
    const {isOpen, onRequestClose, room} = this.props;
    const {confirmingDelete} = this.state;
    return <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      onAfterOpen={() => this.setState({confirmingDelete: false, editingRoom: false})}
      appElement={document.getElementById('root')}
      className="modal-fit-content">
      {isOpen && <>
        <button onClick={() => this.setState({confirmingDelete: true})}
                type="button"
                className="btn btn--inline">
          Delete Room
        </button>
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