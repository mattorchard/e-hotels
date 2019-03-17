import React from "react";
import {toast} from "react-toastify";
import ConfirmationModal from "../../components/ConfirmationModal";
import Address from "../../components/Address";

export default class DeleteHotelModal extends React.Component {


  deleteHotel = async () => {
    try {
      const {hotelChainName, id} = this.props.hotel;
      const response = await fetch(`/api/hotel-chains/${hotelChainName}/${id}`, {method: "DELETE"});
      if (!response.ok) {
        throw new Error(`Unable to delete hotel ${response.status}`);
      }
      toast.success("Hotel deleted");
      this.props.onComplete();
      this.props.onRequestClose();
    } catch (error) {
      console.error("Unable to delete hotel", error);
      toast.error("Unable to delete hotel");
    }
  };

  render() {
    const {isOpen, onRequestClose, hotel} = this.props;
    return <ConfirmationModal
      isOpen={isOpen}
      onCancel={onRequestClose}
      onConfirm={this.deleteHotel}
      appElement={document.getElementById('root')}
      className="modal-fit-content">
      {isOpen && <>
        <h2>
          Delete Hotel
        </h2>
        <p>
          Are you sure you want to <em>permanently</em> delete the <strong>
          {hotel.hotelChainName}</strong> hotel at: <strong><Address {...hotel.address}/></strong>?
          Doing so will also delete <em>all rooms</em> associated with this hotel
        </p>
      </>}
    </ConfirmationModal>
  }
}