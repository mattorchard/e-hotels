import React from "react";
import ReactModal from "react-modal";
import {toast} from "react-toastify";

export default class AddHotelModal extends React.Component {

  async addHotel() {
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