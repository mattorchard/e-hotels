import React from "react";
import HotelChainManager from "../components/AdminComponents/HotelChainManager";
import {simulateDelay} from "../services/simulator-service";
import {AsyncList} from "../components/AsyncList";


export default class AdminPage extends React.Component {

  state = {
    loadingHotelChains: true,
    hotelChains: []
  };

  async componentDidMount() {
    await simulateDelay(500);
    const hotelChains = [{id: 1}];
    this.setState({hotelChains, loadingHotelChains: false});
  }

  render() {
    return <main className="main-content">
      <h2>Hotel Chains</h2>
      <button type="button" className="btn fill add-btn">
        Add Hotel Chain
      </button>
      <AsyncList loading={this.state.loadingHotelChains}
                 placeholderMessage="No hotel chains."
                 loadingMessage="Loading hotel chains...">
        {this.state.hotelChains.map(chain =>
          <li key={chain.id}><HotelChainManager {...chain}/></li>)}
      </AsyncList>

    </main>;
  }
}