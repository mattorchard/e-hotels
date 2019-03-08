import React from "react";
import {DateRangePicker} from "react-dates";
import {toast} from "react-toastify";
import BookingSearchOptions from "./BookingSearchOptions";
import BookingSearchResults from "./BookingSearchResults";
import {debounce} from "lodash";
import CreateBookingModal from "./CreateBookingModal";


export default class BookingSearch extends React.Component {

  state = {
    startDate: null,
    endDate: null,
    focusedInput: null,
    loadingRooms: false,
    selectedRoom: null,
    roomsByHotel: [],
    filterSettings: {
      minPrice: "",
      maxPrice: "",
      minCapacity: "",
      category: "",
      chain: "",
      minRooms: ""
    }
  };

  onDatesChange = async ({startDate, endDate}) => {
    this.setState({startDate, endDate});
    if (startDate && endDate) {
      await this.loadRooms(startDate, endDate);
    }
  };

  loadRooms = async (startDate, endDate) => {
    try {
      this.setState({loadingRooms: true});
      const query = new URLSearchParams();
      query.append("startDate", startDate);
      query.append("endDate", endDate);
      const response = await fetch(`/api/rooms?${query}`);
      if (!response.ok) {
        throw new Error(`Unable to fetch available rooms ${response.status}`);
      }
      const roomsByHotel = await response.json();
      this.setState({roomsByHotel, loadingRooms: false});
    } catch (error) {
      console.error("Unable to load rooms", error);
      toast.error("Unable to load available rooms");
      this.setState({loadingRooms: false});
    }
  };

  clearResults = () => {
    this.setState({startDate: null, endDate: null, roomsByHotel: []})
  };

  setFilterSettings = debounce(
    filterSettings => this.setState({filterSettings: filterSettings}), 1000);


  render() {
    const {customerId} = this.props;
    const {startDate, endDate, filterSettings, roomsByHotel, selectedRoom} = this.state;
    return <section>
      <div className="large-card">
        <h2>Book a room</h2>
        <DateRangePicker
          startDate={startDate}
          startDateId={`startDate-${customerId}`}
          endDate={endDate}
          numberOfMonths={window.innerWidth < 1000 ? 1 : 2}
          endDateId={`endDate-${customerId}`}
          onDatesChange={this.onDatesChange}
          focusedInput={this.state.focusedInput}
          onFocusChange={focusedInput => this.setState({focusedInput})}/>

        <BookingSearchOptions
          onChange={this.setFilterSettings}/>

      </div>
      <BookingSearchResults
        filterSettings={filterSettings}
        roomsByHotel={roomsByHotel}
        onSelectRoom={room => this.setState({selectedRoom: room})}/>

      {selectedRoom &&
        <CreateBookingModal
          startDate={startDate}
          endDate={endDate}
          customerId={customerId}
          room={selectedRoom}
          onRequestReload={this.clearResults}
          onRequestClose={() => this.setState({selectedRoom: null})}/>
      }

    </section>;
  }
}