import React from "react";
import Stars from "../../../components/Stars";
import AddressFields from "../../../components/AddressFields";
import EmployeeSelect from "../../../components/EmployeeSelect";


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
    <EmployeeSelect/>
  </label>
  <AddressFields state={state} onChange={onChange}/>
</>;

export default HotelFields;