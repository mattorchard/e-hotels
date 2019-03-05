import React from "react";
import AddressFields from "./AddressFields";

const PersonFields = ({state, onChange}) => <>
  <label>
    Given Name
    <input name="givenName"
           type="text"
           maxLength="100"
           required
           value={state.givenName}
           onChange={onChange}/>
  </label>
  <label>
    Family Name
    <input name="familyName"
           type="text"
           maxLength="100"
           required
           value={state.familyName}
           onChange={onChange}/>
  </label>
  <label>
    SIN
    <input name="sin"
           type="number"
           required={!Boolean(state.ssn)}
           value={state.sin}
           min={100000000}
           max={999999999}
           onChange={onChange}/>
  </label>
  <label>
    SSN
    <input name="ssn"
           type="number"
           required={!Boolean(state.sin)}
           value={state.ssn}
           min={100000000}
           max={999999999}
           onChange={onChange}/>
  </label>
  <AddressFields state={state} onChange={onChange}/>
</>;

export default PersonFields;