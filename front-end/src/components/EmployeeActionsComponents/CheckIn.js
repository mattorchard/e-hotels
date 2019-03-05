import React from "react";
import {toast} from "react-toastify";
import {AsyncItems} from "../AsyncItems";
import HotelCheckIn from "./HotelCheckIn";


export default class CheckIn extends React.Component {

  state = {
    loadingHotels: false,
    hotels: []
  };

  async componentDidMount() {
    try {
      await this.loadHotels();
    } catch (error) {
      console.error(error);
      toast.error("Unable to fetch hotels");
    }
  }

  loadHotels = async elementId => {
    const {hotelChainName} = this.props;
    this.setState({loadingBookings: true});
    const response = await fetch(`/api/hotel-chains/${hotelChainName}/hotels`);
    if (!response.ok) {throw new Error(`Failed to fetch hotels [${response.status}]`)}
    const hotels = await response.json();
    this.setState({hotels, loadingHotels: false});
  };



  render() {
    const {employeeId, hotelChainName} = this.props;
    return <>
      <ul className="no-bullet">
        <AsyncItems loading={this.state.loadingHotels}>
          {this.state.hotels.map(hotel =>
            <li key={hotel.id}>
              <HotelCheckIn
                employeeId={employeeId}
                hotel={hotel}
                hotelChainName={hotelChainName}
                onSave={this.loadHotels}/>
            </li>)}
        </AsyncItems>
      </ul>
    </>
  }
}

