import React from "react";
import ReactModal from "react-modal";
import {toast} from "react-toastify";
import HotelForm from "./HotelModalComponents/HotelForm";

export default class AddHotelModal extends React.Component {

  addHotel = async hotel => {
    const {hotelChainName} = this.props;
    try {
      const response = await fetch(`/api/hotel-chains/${hotelChainName}/hotels`, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(hotel)
      });
      if (!response.ok) {
        throw new Error(`Unable to create hotel ${response.status}`);
      }
      toast.success("Hotel Created");
      this.props.onComplete();
      this.props.onRequestClose();
    } catch(error) {
      console.error("Unable to create hotel", error);
      toast.error("Unable to create hotel");
    }
  };

  render() {
    const {isOpen, onRequestClose, hotelChainName} = this.props;
    return <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      appElement={document.getElementById('root')}
      className="modal-fit-content">

      <HotelForm hotelChainName={hotelChainName} onSubmit={this.addHotel}>
        <div>
          <button type="submit" className="btn btn--inline fill">
            Create
          </button>
          <button type="button" className="btn btn--inline" onClick={onRequestClose}>
            Cancel
          </button>
        </div>

      </HotelForm>
    </ReactModal>
  }
}