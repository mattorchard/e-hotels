import React from "react";
import {toast} from "react-toastify";
import {AsyncItems} from "../AsyncItems";


export default class RoomsByArea extends React.Component {

  state = {
    loadingRoomsByArea: true,
    roomsByArea: []
  };

  async componentDidMount() {
    try {
      this.setState({loadingRoomsByArea: true});
      const response = await fetch("/api/areas/rooms");
      const roomsByArea = await response.json();
      this.setState({roomsByArea, loadingRoomsByArea: false});
    } catch(error) {
      console.error(error);
      toast.error("Unable to fetch rooms by area");
      this.setState({loadingRoomsByArea: false});
    }
  }

  render() {
    const {roomsByArea, loadingRoomsByArea} = this.state;
    return <section className="large-card">
      <h2>Rooms by Area</h2>
      <dl className="multi-col-dl">
        <AsyncItems loading={loadingRoomsByArea} wrapper="dl">
          {roomsByArea.map(({city, country, numRooms}) => <React.Fragment key={`${city}-${country}`}>
            <dt>{city}, {country}</dt>
            <dd>{numRooms}</dd>
          </React.Fragment>)}
        </AsyncItems>
      </dl>
    </section>
  }
}