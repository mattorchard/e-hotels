import React from "react";
import Stars from "../../../components/Stars";
import AddressFields from "../../../components/AddressFields";


const HotelFields = ({state, onChange}) => <>
  <label>
    Category
    <Stars
      name="category"
      number={state.category}
      onChange={onChange}/>
  </label>
  <label>
    Manager
    <select className="simple-input"/>
  </label>
  <AddressFields state={state} onChange={onChange}/>
</>;

export default HotelFields;