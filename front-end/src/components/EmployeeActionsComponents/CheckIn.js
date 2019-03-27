import React from "react";
import {toast} from "react-toastify";
import {AsyncItems} from "../AsyncItems";
import HotelCheckIn from "./HotelCheckIn";


export default class CheckIn extends React.Component {

  state = {
    loadingHotels: true,
    hotels: [],
    numBookingsByHotel: {}
  };

  async componentDidMount() {
    await this.loadHotels();
  }

  loadHotels = async () => {
    try {
      const {hotelChainName} = this.props;
      this.setState({loadingHotels: true});

      const hotelPromise = fetch(`/api/hotel-chains/${hotelChainName}/hotels`);
      const bookingPromise = fetch(`/api/hotel-chains/${hotelChainName}/upcoming-bookings`);
      const [hotelResponse, bookingResponse] = await Promise.all([hotelPromise, bookingPromise]);
      if (!hotelResponse.ok) {
        throw new Error(`Unable to fetch hotels ${hotelResponse.status}`)
      }
      if (!bookingResponse.ok) {
        throw new Error(`Unable to fetch upcoming bookings ${bookingResponse.status}`)
      }
      const [hotels, numBookingsByHotel] = await Promise.all([hotelResponse.json(), bookingResponse.json()]);

      this.setState({hotels, numBookingsByHotel, loadingHotels: false});
    } catch (error) {
      console.error(error);
      toast.error("Unable to fetch hotels");
      this.setState({loadingHotels: false});
    }
  };


  render() {
    const {employeeId, hotelChainName} = this.props;
    const {numBookingsByHotel, hotels, loadingHotels} = this.state;
    return <>
      <ul className="no-bullet">
        <AsyncItems loading={loadingHotels}>
          {hotels.map(hotel =>
            <li key={hotel.id}>
              <HotelCheckIn
                employeeId={employeeId}
                hotel={hotel}
                numberOfUpcomingBookings={numBookingsByHotel[hotel.id]}
                hotelChainName={hotelChainName}
                onRequestReload={this.loadHotels}/>
            </li>)}
        </AsyncItems>
      </ul>
    </>
  }
}

