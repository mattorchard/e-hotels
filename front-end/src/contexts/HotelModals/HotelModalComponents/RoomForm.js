import React from "react";
import RoomFields from "./RoomFields";
import ReactForm from "../../../components/ReactForm";


export default class RoomForm extends ReactForm {
  constructor(props) {
    super(props);
    if (props.room) {
      const {roomNumber, price, capacity, extendable, scenery, amenities, damages} = props.room;
      this.state = {
        roomNumber,
        price,
        capacity,
        extendable: extendable,
        scenery: scenery || "",
        amenities: amenities || [],
        damages: damages || []
      };
    } else {
      this.state = {
        roomNumber: "",
        price: "",
        capacity: "",
        extendable: false,
        scenery: "",
        amenities: [],
        damages: []
      };
    }
  }
  onSubmit = async event => {
    event.preventDefault();
    const room = {
      ...this.state,
      extendable: this.state.extendable === "true"
    };
    return this.props.onSubmit(room);
  };
  render() {
    const {disabled, children, roomNumberDisabled} = this.props;
    return <form onSubmit={this.onSubmit}>
      <fieldset className="simple-form" disabled={disabled}>
        <RoomFields state={this.state}
                    roomNumberDisabled={roomNumberDisabled}
                    onChange={this.handleInputChange}/>
        {children}
      </fieldset>
    </form>
  }
}