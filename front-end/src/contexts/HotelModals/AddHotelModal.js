import React from "react";
import ReactModal from "react-modal";
import {toast} from "react-toastify";
import HotelForm from "./HotelModalComponents/HotelForm";

export default class AddHotelModal extends React.Component {

  addHotel = async hotel => {
    toast.warn("Feature not implemented");
    console.log(hotel);
  };

  render() {
    const {isOpen, onRequestClose} = this.props;
    return <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      appElement={document.getElementById('root')}
      className="modal-fit-content">

      <HotelForm onSubmit={this.addHotel}/>
    </ReactModal>
  }
}