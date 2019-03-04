import React from "react";

const AddressFields = ({state, handleInputChange}) => <>
  <label>
    Street Number
    <input name="streetNumber"
           type="number"
           value={state.streetNumber}
           min={0}
           onChange={handleInputChange}/>
  </label>
  <label>
    Street Name
    <input name="streetName"
           type="text"
           value={state.streetName}
           onChange={handleInputChange}/>
  </label>
  <label>
    City
    <input name="city"
           type="text"
           value={state.city}
           onChange={handleInputChange}/>
  </label>
  <label>
    Country
    <input name="country"
           type="text"
           value={state.country}
           onChange={handleInputChange}/>
  </label>
</>;


export default AddressFields;
