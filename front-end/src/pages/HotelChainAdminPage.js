import React from "react";
import HotelChainSection from "../components/HotelChainAdminComponents/HotelChainSection";
import {AsyncItems} from "../components/AsyncItems";
import {toast} from "react-toastify";
import "./HotelChainAdminPage.css";
import HotelModalProvider from "../contexts/HotelModalProvider";


export default class HotelChainAdminPage extends React.Component {

  state = {
    loadingHotelChains: true,
    hotelChains: []
  };

  async componentDidMount() {
    try {
      const response = await fetch("/api/hotel-chains");
      if (!response.ok) {
        throw new Error(`Unable to fetch hotel chains code: [${response.status}]`);
      }
      const hotelChains = await response.json();
      this.setState({hotelChains, loadingHotelChains: false});
    } catch (error) {
      toast.error("Unable to fetch hotel chains")
    }
  }

  render() {
    return <HotelModalProvider>
      <main className="main-content main-content--clear">
        <AsyncItems loading={this.state.loadingHotelChains}
                    placeholderMessage="No hotel chains."
                    loadingMessage="Loading hotel chains..."
                    wrapper>

          {this.state.hotelChains.map(chain =>
            <HotelChainSection key={chain.id} {...chain}/>)}
        </AsyncItems>
      </main>
    </HotelModalProvider>;
  }
}