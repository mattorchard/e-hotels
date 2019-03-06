import React from "react";
import RentalForm from "./RentalForm";

export default class CreateRenting extends React.Component {

  saveRenting = async () => {
    throw new Error("F");
  };

  render() {
    const {hotelChainName, hotelId, onRequestClose} = this.props;
    return <div className="create-renting">
      <hr/>
      <h3>Create Renting</h3>
      <RentalForm booking={{hotelChainName, hotelId}} onSubmit={this.saveRenting}>
        <button type="button" className="btn btn--inline" onClick={onRequestClose}>
          Cancel
        </button>
      </RentalForm>
    </div>
  }
}