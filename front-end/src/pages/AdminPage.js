import React from "react";
import HotelChainManager from "../components/AdminComponents/HotelChainManager";
import {AsyncItems} from "../components/AsyncItems";


export default class AdminPage extends React.Component {

  state = {
    loadingHotelChains: true,
    hotelChains: []
  };

  async componentDidMount() {
    const response = await fetch("/api/hotel-chains");
    if (!response.ok) { throw new Error(`Unable to fetch hotel chains code: [${response.status}]`); }
    const hotelChains = await response.json();
    this.setState({hotelChains, loadingHotelChains: false});
  }

  render() {
    return <main className="main-content">
      <h2>Hotel Chains</h2>
      <button type="button" className="btn fill add-btn">
        Add Hotel Chain
      </button>
      <ul className="no-bullet">
        <AsyncItems loading={this.state.loadingHotelChains}
                   placeholderMessage="No hotel chains."
                   loadingMessage="Loading hotel chains...">

          {this.state.hotelChains.map(chain =>
            <li key={chain.id}><HotelChainManager {...chain}/></li>)}
        </AsyncItems>
      </ul>

    </main>;
  }
}