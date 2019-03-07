import React from "react";
import RentalForm from "./RentalForm";
import {toast} from "react-toastify";


export default class CreateRental extends React.Component {

  saveRental = async rental => {
    try {
      const {hotelChainName, hotelId, roomNumber, ...body} = rental;
      const response = await fetch(`/api/hotel-chains/${hotelChainName}/${hotelId}/${roomNumber}/rent`, {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(body)
      });
      if (!response.ok) {
        if (response.status === 409) {
          toast.error("That room is unavailable at that time");
        }
        throw new Error("Unable to create rental");
      }
      toast.success("Rental created");
      this.props.onRequestClose();
    } catch (error) {
      toast.error("Unable to create rental");
    }
  };

  render() {
    const {hotelChainName, hotelId, employeeId, onRequestClose} = this.props;
    return <div className="create-renting">
      <hr/>
      <h3>Create Renting</h3>
      <RentalForm
        hotelChainName={hotelChainName}
        hotelId={hotelId}
        employeeId={employeeId}
        onSubmit={this.saveRental}>

        <button type="button" className="btn btn--inline" onClick={onRequestClose}>
          Cancel
        </button>

      </RentalForm>
    </div>
  }
}