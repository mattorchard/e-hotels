import React from "react";
import ReactModal from "react-modal";
import {toast} from "react-toastify";
import HotelForm from "./HotelModalComponents/HotelForm";

export default class EditHotelModal extends React.Component {

  saveHotel = async hotel => {
    const {hotelChainName, id: hotelId} = this.props.hotel;
    try {
      const response = await fetch(`/api/hotel-chains/${hotelChainName}/${hotelId}`, {
        method: "PUT",
        body: JSON.stringify(hotel),
        headers: {"Content-type": "application/json"}
      });
      if (!response.ok) {
        throw new Error(`Unable to save hotel ${response.status}`);
      }
      toast.success("Saved hotel");
      this.props.onComplete();
      this.props.onRequestClose();
    } catch (error) {
      console.error("Unable to save hotel", error);
      toast.error("Unable to save hotel");
    }
  };

  render() {
    const {hotel, isOpen, onRequestClose} = this.props;
    return <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      appElement={document.getElementById('root')}
      className="modal-fit-content">
      {hotel && <>
        <HotelForm hotelChainName={hotel.hotelChainName} hotel={hotel} onSubmit={this.saveHotel}>
          <div>
            <button type="submit" className="btn btn--inline fill">
              Save
            </button>
            <button type="button" className="btn btn--inline" onClick={onRequestClose}>
              Cancel
            </button>
          </div>
        </HotelForm>
      </>}
    </ReactModal>
  }
}