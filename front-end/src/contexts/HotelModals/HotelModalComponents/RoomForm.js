import React from "react";
import RoomFields from "./RoomFields";
import ReactForm from "../../../components/ReactForm";


export default class RoomForm extends ReactForm {
  state = {
    roomNumber: "",
    price: "",
    capacity: "",
    extendable: false,
    scenery: "",
    amenities: [],
    damages: []
  };

  onSubmit = async event => {
    event.preventDefault();
    const room = {
      ...this.state,
      extendable: this.state.extendable === "true"
    };
    return this.props.onSubmit(room);
  };
  render() {
    const {children} = this.props;
    return <form onSubmit={this.onSubmit}>
      <fieldset className="simple-form">
        <RoomFields state={this.state}
                    onChange={this.handleInputChange}/>
        {children}
      </fieldset>
    </form>
  }
}