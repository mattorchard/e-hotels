import React from "react";
import {toast} from "react-toastify";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "./CalendarPage.css";

const localizer = BigCalendar.momentLocalizer(moment);
const TYPE_CLASS_NAMES = {rental: "rental-event", booking: "booking-event"};


const formatEvent = ({startDate, endDate, customer, roomNumber, address, hotelChainName}) => ({
  title: `${customer.givenName} ${customer.familyName} (${roomNumber} ${address.city} ${hotelChainName})`,
  start: new Date(startDate),
  end: new Date(endDate)
});

const formatCalendarEvents = ({rentals, bookings}) => {
  return [
    ...rentals.map(formatEvent).map(rental => ({...rental, type: "rental"})),
    ...bookings.map(formatEvent).map(rental => ({...rental, type: "booking"})),
  ]
};

export default class CalendarPage extends React.Component {
  state = {
    loadingEvents: true,
    events: []
  };

  loadEvents = async () => {
    try {
      this.setState({loadingEvents: true});
      const response = await fetch("/api/calendar");
      if (!response.ok) {
        throw new Error(`Unable to load events ${response.status}`);
      }
      const events = formatCalendarEvents(await response.json());
      this.setState({events, loadingEvents: false});
    } catch (error) {
      console.error("Unable to load events", error);
      toast.error("Unable to load events");
      this.setState({loadingEvents: false});
    }
  };

  async componentDidMount() {
    await this.loadEvents();
  }

  eventClassNameGetter = ({type}) => ({className: TYPE_CLASS_NAMES[type]});

  render() {
    const {loadingEvents, events} = this.state;
    return <main className="main-content main-content--clear">
      {loadingEvents
        ? <span className="spinner">Loading events...</span>
        : <div className="large-card">
          <div className="calendar-container">
            <BigCalendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              eventPropGetter={this.eventClassNameGetter}
              views={{month: true, week: true}}/>
          </div>
          <dd className="legend">
            <dt>Bookings</dt>
            <dd className="legend-color booking-event" title="Bookings appear orange">&nbsp;</dd>
            <dt>Rentals</dt>
            <dd className="legend-color rental-event" title="Rentals appear purple">&nbsp;</dd>
          </dd>
        </div>}
    </main>
  }
}
