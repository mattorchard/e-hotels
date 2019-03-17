import React from "react";
import ReactForm from "../../../components/ReactForm";
import HotelFields from "./HotelFields";

export default class HotelForm extends ReactForm {

  constructor(props) {
    super(props);
    if (props.hotel) {
      const {} = props.hotel;
      this.state = {};
    } else {
      this.state = {
        category: 3,
        managerId: "",
        streetNumber: "",
        streetName: "",
        city: "",
        country: "",
        emailAddresses: [],
        phoneNumbers: []
      };
    }
  }

  onSubmit = event => {
    event.preventDefault();
    const {managerId, category, emailAddresses, phoneNumbers, ...address} = this.state;
    const hotel = {managerId, category, emailAddresses, phoneNumbers, address};
    this.props.onSubmit(hotel);
  };

  render() {
    const {children, disabled, hotelChainName} = this.props;
    return <form onSubmit={this.onSubmit}>
      <fieldset disabled={disabled} className="simple-form">
        <HotelFields hotelChainName={hotelChainName} onChange={this.handleInputChange} state={this.state}>
          {children}
        </HotelFields>
        {children}
      </fieldset>
    </form>
  }
}