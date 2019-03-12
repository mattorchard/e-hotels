import React from "react";
import ReactModal from "react-modal";
import {toast} from "react-toastify";

export default class RoomModal extends React.Component {

  async saveRoom() {
    toast.warn("Feature not implemented");
  }

  async deleteRoom() {
    toast.warn("Feature not implemented");
  }

  render() {
    const {isOpen, onRequestClose} = this.props;
    return <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      appElement={document.getElementById('root')}
      className="modal-fit-content">
    </ReactModal>
  }
}