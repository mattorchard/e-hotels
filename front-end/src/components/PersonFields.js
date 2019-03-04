import React from "react";
import AddressFields from "./AddressFields";

const PersonFields = ({state, handleInputChange}) => <>
  <label>
    Given Name
    <input name="givenName"
           type="text"
           required
           value={state.givenName}
           onChange={handleInputChange}/>
  </label>
  <label>
    Family Name
    <input name="familyName"
           type="text"
           required
           value={state.familyName}
           onChange={handleInputChange}/>
  </label>
  <label>
    SIN
    <input name="sin"
           type="number"
           required={!Boolean(state.ssn)}
           value={state.sin}
           min={100000000}
           max={999999999}
           onChange={handleInputChange}/>
  </label>
  <label>
    SSN
    <input name="ssn"
           type="number"
           required={!Boolean(state.sin)}
           value={state.ssn}
           min={100000000}
           max={999999999}
           onChange={handleInputChange}/>
  </label>
  <AddressFields state={state} handleInputChange={handleInputChange}/>
</>;

export default PersonFields;