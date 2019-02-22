import React from "react";
import {Link} from "react-router-dom";
import {simulateDelay} from "../services/simulator-service";

export default class HotelChainSelector extends React.Component {
  state = {
    hotelChains: [],
    loadingHotelChains: true
  };

  async componentDidMount() {
    await simulateDelay(1000);
    const hotelChains = [{id: 3, name: "Best Western"}];
    this.setState({hotelChains, loadingHotelChains: false});
  }


  render() {
    if (this.state.loadingHotelChains) {
      return <span className="spinner">
        Loading hotel chains...
      </span>
    } else if (this.state.hotelChains && this.state.hotelChains.length < 1) {
      return <span>
          No Hotel chains found. To create one use the <Link to="/admin">admin page</Link>
        </span>
    } else {
      return <select onChange={this.props.onChange}>
        <option value="" className="hidden-option"/>
        {this.state.hotelChains.map(chain =>
          <option key={chain.id} value={chain.id}>{chain.name}</option>)}
      </select>
    }
  }
}