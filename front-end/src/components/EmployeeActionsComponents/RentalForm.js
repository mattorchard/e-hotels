import React from "react";
import ReactForm from "../ReactForm";
import {DateRangePicker} from "react-dates";
import moment from "moment";
import CustomerSelect from "../CustomerSelect";
import RoomSelect from "../RoomSelect";

export default class RentalForm extends ReactForm {

  constructor(props) {
    super(props);
    this.state = {}
  }

  onSubmit = async () => {
    const booking = this.state;
    await this.props.onSubmit(booking);
  };

  render() {
    const {booking, disabled, children, customers} = this.props;
    const {hotelChainName, hotelId} = booking;
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
          Customer
          <CustomerSelect customers={customers}/>
        </label>

        <label>
          Start and End Date
          <DateRangePicker
            startDate={moment().startOf('day')}
            startDateId={`startDate-${hotelChainName}-${hotelId}`}
            endDate={this.state.endDate}
            endDateId={`endDate-${hotelChainName}-${hotelId}`}
            onDatesChange={({startDate, endDate}) => this.setState({startDate, endDate})}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput })}/>
        </label>

        <label>
          Room #
          <RoomSelect/>
        </label>
        <div>
          <button type="submit" className="btn btn--inline">
            Save
          </button>
          {children}
        </div>
      </fieldset>
    </form>
  }
}