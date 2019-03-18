import React from "react";
import HotelCard from "./HotelCard";
import Address from "../Address";
import {AsyncItems} from "../AsyncItems";
import ContactInfo from "../ContactInfo";
import HotelModalContext from "../../contexts/HotelModalContext";

export default class HotelChainSection extends React.Component {
  static contextType = HotelModalContext;

  state = {
    showingHotels: false,
    loadingHotels: false,
    hotels: []
  };

  loadHotels = async () => {
    this.setState({showingHotels: true, loadingHotels: true});
    const response = await fetch(`/api/hotel-chains/${this.props.name}/hotels`);
    if (!response.ok) {
      throw new Error(`Unable to fetch hotels status: [${response.status}]`);
    }
    const hotels = await response.json();
    this.setState({hotels, loadingHotels: false});
  };

  render() {
    const {name, address, phoneNumbers, emailAddresses} = this.props;
    const {showingHotels} = this.state;
    const {addHotel, deleteHotelChain} = this.context;
    return <section>
      <div className="hotel-chain-section__head">
        <div>
          <h2 className="hotel-chain-section__title">{name}</h2>
          <Address {...address} />
        </div>
        <ContactInfo phoneNumbers={phoneNumbers} emailAddresses={emailAddresses}/>
        {showingHotels
          ? <button className="btn btn--inverse" onClick={() => addHotel(name, this.loadHotels)}>
            Add Hotel
          </button>
          : <button className="btn btn--inverse" onClick={this.loadHotels}>
            Show Hotels
          </button>
        }
        <button className="x-icon" title="Delete Hotel Chain" onClick={() => deleteHotelChain(name)}>
          &times;
        </button>
      </div>
      {showingHotels && <ul className="rails">
        <AsyncItems loading={this.state.loadingHotels}>
          {this.state.hotels.map(hotel =>
            <li key={hotel.id}>
              <HotelCard hotel={hotel} reloadHotels={this.loadHotels}/>
            </li>)}
        </AsyncItems>
      </ul>}
    </section>;
  }
}