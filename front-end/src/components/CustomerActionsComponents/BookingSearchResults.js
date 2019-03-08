import React from "react";


export default class BookingSearchResults extends React.Component {
  static applyFilter = (groupedRooms, filterSettings) =>
    groupedRooms.flatMap(hotel =>
      hotel.rooms.filter(room => {
        if (Object.keys(filterSettings).length < 1) {
          return true
        }
        return false
      }));

  render() {
    const {filterSettings, groupedRooms} = this.props;
    const rooms = BookingSearchResults.applyFilter(groupedRooms, filterSettings);
    return <ul>
      {rooms.map(room =>
        <li key={`${room.hotelChainName}-${room.hotelId}-${room.roomNumber}`}>
          {JSON.stringify(room)}
        </li>)}
    </ul>
  }
}