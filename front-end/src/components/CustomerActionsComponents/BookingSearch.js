import React from "react";
import {DateRangePicker} from "react-dates";
import {toast} from "react-toastify";

export default class BookingSearch extends React.Component {

  state = {
    startDate: null,
    endDate: null,
    focusedInput: null,
    loadingRooms: false,
    rooms: []
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
      const rooms = await response.json();
      this.setState({rooms, loadingRooms: false});
    } catch (error) {
      console.error("Unable to load rooms", error);
      toast.error("Unable to load available rooms");
      this.setState({loadingRooms: false});
    }
  };

  render() {
    const {customerId} = this.props;
    const {startDate, endDate, rooms} = this.state;
    return <section>
      <h2>Book a room</h2>
      <DateRangePicker
        required
        startDate={startDate}
        startDateId={`startDate-${customerId}`}
        endDate={endDate}
        numberOfMonths={window.innerWidth < 1000 ? 1 : 2}
        endDateId={`endDate-${customerId}`}
        onDatesChange={this.onDatesChange}
        focusedInput={this.state.focusedInput}
        onFocusChange={focusedInput => this.setState({focusedInput})}/>
      {JSON.stringify(rooms)}
    </section>;
  }
}