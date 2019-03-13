import React from "react";
import Stars from "../../../components/Stars";
import AddressFields from "../../../components/AddressFields";
import EmployeeSelect from "../../../components/EmployeeSelect";
import ListInput from "../../../components/ListInput";


const stripPhoneNumber = phoneNumber =>
  phoneNumber.split(/\D/).join("");

const HotelFields = ({state, onChange, hotelChainName}) => <>
  <div className="small-input">
    <label>
      Category
      <Stars
        name="category"
        number={state.category}
        onChange={onChange}/>
    </label>
  </div>
  <label>
    Manager
    <EmployeeSelect hotelChainName={hotelChainName}/>
  </label>
  <AddressFields state={state} onChange={onChange}/>

  <ListInput label="Phone Numbers"
             name="phoneNumbers"
             value={state.phoneNumbers || []}
             format={stripPhoneNumber}
             onChange={onChange}>
    <input type="tel"
           pattern="(\D?\d){11}"/>
  </ListInput>

  <ListInput label="Email Addresses"
             name="emailAddresses"
             value={state.emailAddresses || []}
             format={e => e.toLowerCase()}
             onChange={onChange}>
    <input type="email"/>
  </ListInput>

</>;

export default HotelFields;