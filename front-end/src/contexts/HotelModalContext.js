import React from "react";

const HotelModalContext = React.createContext({
  editHotel: () => {},
  deleteHotel: () => {},
  addRoom: () => {},
  openRoom: () => {}
});
export default HotelModalContext;
