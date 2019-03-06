import React from "react";
import RentalForm from "./RentalForm";
import {toast} from "react-toastify";


export default class CreateRental extends React.Component {

  saveRental = async rental => {
    console.log(rental);
    try {
      throw new Error();
    } catch (error) {
      toast.error(JSON.stringify(rental))
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