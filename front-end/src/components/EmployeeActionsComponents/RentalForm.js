import React from "react";
import ReactForm from "../ReactForm";
import {DateRangePicker} from "react-dates";
import {START_DATE} from "react-dates/constants";
import moment from "moment";
import CustomerSelect from "../CustomerSelect";
import RoomSelect from "../RoomSelect";
import {toast} from "react-toastify";


export default class RentalForm extends ReactForm {

  state = {
    customerId: "",
    roomNumber: "",
    startDate: null,
    endDate: null,
    focusedInput: null,
    loadingRooms: false,
    rooms: []
  };

  onSubmit = async event => {
    event.preventDefault();
    const {employeeId, hotelChainName, hotelId} = this.props;
    const {customerId, roomNumber, startDate, endDate} = this.state;
    const booking = {employeeId, hotelChainName, hotelId, customerId, roomNumber, startDate, endDate};
    await this.props.onSubmit(booking);
  };

  onDatesChange = async ({startDate, endDate}) => {
    this.setState({startDate, endDate});
    const {hotelChainName, hotelId} = this.props;
    await this.loadRooms(({hotelChainName, hotelId, startDate, endDate}));
  };

  loadRooms = async ({hotelChainName, hotelId, startDate, endDate}) => {
    try {
      this.setState({loadingRooms: true});
      const query = new URLSearchParams();
      query.append("startDate", startDate);
      query.append("endDate", endDate);
      const response = await fetch(`/api/hotel-chains/${hotelChainName}/${hotelId}/rentals?${query}`);
      if (!response.ok) {
        throw new Error(`Unable to fetch available rooms [${response.status}]`)
      }
      const rooms = await response.json();
      this.setState({rooms, loadingRooms: false});
    } catch (error) {
      console.error(error);
      toast.error("Unable to fetch available rooms");
      this.setState({loadingRooms: false, rooms: []});
    }
  };


  render() {
    const {hotelChainName, hotelId, disabled, children} = this.props;
    const {customerId, endDate, roomNumber, rooms, loadingRooms} = this.state;
    const startDate = moment().startOf('day');

    return <form onSubmit={this.onSubmit}>
      <fieldset disabled={disabled} className="simple-form">
        <label>
          Hotel Chain
          <input type="text"
                 disabled
                 value={hotelChainName}/>
        </label>
        <label>
          Hotel ID
          <input type="number"
                 disabled
                 value={hotelId}/>
        </label>

        <label>
          Start and End Date
          <div>
            <DateRangePicker
              required
              startDate={startDate}
              startDateId={`startDate-${hotelChainName}-${hotelId}`}
              disabled={START_DATE}
              endDate={endDate}
              endDateId={`endDate-${hotelChainName}-${hotelId}`}
              onDatesChange={this.onDatesChange}
              focusedInput={this.state.focusedInput}
              onFocusChange={focusedInput => this.setState({focusedInput})}/>
          </div>
        </label>

        <label>
          Room #
          {loadingRooms
            ? <div className="spinner">Loading available rooms...</div>
            : <RoomSelect
              placeholder="No availability for selected date range"
              rooms={rooms}
              value={roomNumber}
              onChange={roomNumber => this.setState({roomNumber})}/>}
        </label>

        <label>
          Customer
          <CustomerSelect
            value={customerId}
            onChange={({id}) => this.setState({customerId: id})}/>
        </label>

        <div>
          <button type="submit" className="btn btn--inline" onSubmit={this.onSubmit}>
            Save
          </button>
          {children}
        </div>
      </fieldset>
    </form>
  }
}