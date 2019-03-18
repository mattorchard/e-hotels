import React from "react";

const HotelModalContext = React.createContext({
  addHotel: () => {},
  editHotel: () => {},
  deleteHotel: () => {},
  addRoom: () => {},
  openRoom: () => {}
});
export default HotelModalContext;
