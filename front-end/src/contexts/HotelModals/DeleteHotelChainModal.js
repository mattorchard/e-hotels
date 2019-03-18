import React from "react";
import ReactModal from "react-modal";
import ReactForm from "../../components/ReactForm";
import {toast} from "react-toastify";
import TripleConfirmButton from "../../components/TripleConfirmButton";


export default class DeleteHotelChainModal extends ReactForm {
  state = {
    confirmText: ""
  };

  deleteHotelChain = async () => {
    const {hotelChainName} = this.props;
    try {
      const response = await fetch(`/api/hotel-chains/${hotelChainName}`, {method: "DELETE"});
      if (!response.ok) {
        if (response.status === 403) {
          toast.error("Deleting hotel chains has been disabled for this deployment")
        }
        throw new Error(`Unable to delete hotel chain ${response.status}`);
      }
      toast.success("Deleted hotel chain");
      this.props.onComplete();
      this.props.onRequestClose();
    } catch (error) {
      toast.error("Unable to delete hotel chain");
    }
  };


  render() {
    const {isOpen, onRequestClose, hotelChainName} = this.props;
    const {confirmText} = this.state;
    const enabled = hotelChainName
      ? hotelChainName.toLowerCase() === confirmText.toLowerCase() :
      false;
    return <ReactModal
      onAfterOpen={() => this.setState({confirmText: ""})}
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      appElement={document.getElementById('root')}
      className="modal-fit-content">
      <h2>Delete {hotelChainName}</h2>
      <p>
        Are you sure you want to delete <strong>{hotelChainName}</strong> and <em>all</em> of its:
      </p>
      <ul>
        <li>hotels,</li>
        <li>rooms,</li>
        <li>employees,</li>
        <li>rentals,</li>
        <li>bookings.</li>
      </ul>
      <p>
        This process <strong>cannot</strong> be undone.
      </p>


      <label>
        To confirm type the name of the hotel chain ({hotelChainName})
        <br/>
        <input name="confirmText"
               className="confirm-deletion-input"
               onChange={this.handleInputChange}
               value={confirmText}/>
      </label>
      <TripleConfirmButton
        className="btn btn--inline btn--danger"
        type="button"
        onClick={this.deleteHotelChain}
        disabled={!enabled}>
        Confirm
      </TripleConfirmButton>

    </ReactModal>
  }
}