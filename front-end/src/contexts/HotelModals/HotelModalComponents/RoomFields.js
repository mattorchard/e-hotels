import React from "react";
import ListInput from "../../../components/ListInput";

const RoomFields = ({state, onChange, roomNumberDisabled}) => <>
  <label>
    Room Number
    <input name="roomNumber"
           type="number"
           required
           disabled={roomNumberDisabled}
           min={0}
           value={state.roomNumber}
           onChange={onChange}/>
  </label>
  <label>
    Price
    <input name="price"
           type="number"
           required
           min={1}
           value={state.price}
           onChange={onChange}/>
  </label>
  <label>
    Capacity
    <input name="capacity"
           type="number"
           required
           min={1}
           value={state.capacity}
           onChange={onChange}/>
  </label>
  <label>
    Extendable
    <select name="extendable"
            value={state.extendable}
            className="simple-input"
            onChange={onChange}>
      <option value="false">No</option>
      <option value="true">Yes</option>
    </select>
  </label>
  <label>
    Scenery
    <input name="scenery"
           type="text"
           value={state.scenery}
           onChange={onChange}/>
  </label>

  <ListInput label="Amenities"
             name="amenities"
             value={state.amenities || []}
             onChange={onChange}>
    <input type="text" maxLength="100"/>
  </ListInput>

  <ListInput label="Damages"
             name="damages"
             value={state.damages || []}
             onChange={onChange}>
    <input type="text" maxLength="100"/>
  </ListInput>
</>;
export default RoomFields;