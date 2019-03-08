import React from "react";
import ReactModal from "react-modal";
import {toast} from "react-toastify";
import moment from "moment";
import {formatDateShort} from "../../services/format-service";
import {AsyncItems} from "../AsyncItems";

export default class CreateBookingModal extends React.Component {
  state = {
    loadingRoomDetails: false,
    roomDetails: {
      amenities: [],
      damages: []
    }
  };

  bookRoom = () => {

  };

  async componentDidMount() {
    this.setState({loadingRoomDetails: true});
    try {
      const {hotelChainName, hotelId, roomNumber} = this.props.room;
      const response = await fetch(`/api/hotel-chains/${hotelChainName}/${hotelId}/${roomNumber}`);
      if (!response.ok) {
        throw new Error(`Unable to fetch room details ${response.status}`);
      }
      const roomDetails = await response.json();
      this.setState({roomDetails, loadingRoomDetails: false});
    } catch (error) {
      console.error(error);
      toast.error("Unable to fetch room details");
      this.setState({loadingRoomDetails: false});
    }
  }


  render() {
    const {room, onRequestClose, startDate, endDate} = this.props;
    const {hotelChainName, roomNumber, price, capacity, scenery, extendable} = room;
    const {damages, amenities} = this.state.roomDetails;

    const duration = 1 + moment.duration(endDate.diff(startDate)).days();
    return <ReactModal
      isOpen={Boolean(room)}
      onRequestClose={onRequestClose}
      appElement={document.getElementById('root')}
      className="modal-fit-content">
      <dl className="nested-dl">
        <dt>Room Details</dt>
        <dd>
          <dl>
            <dt>Hotel Chain</dt>
            <dd>{hotelChainName}</dd>

            <dt>Room Number</dt>
            <dd>{roomNumber}</dd>

            <dt>Price per Night</dt>
            <dd>${price}</dd>

            <dt>Capacity</dt>
            <dd>
              {capacity}<span title="Extendable">{extendable && "+"}</span>
            </dd>

            {scenery && <>
              <dt>Scenery</dt>
              <dd>{scenery}</dd>
            </>}

            <dt>Damages</dt>
            <dd>
              <ul className="no-bullet inline-list">
                <AsyncItems
                  loading={this.state.loadingRoomDetails}
                  placeholderMessage="None">
                  {damages.map(d => <li key={d}>{d}</li>)}
                </AsyncItems>
              </ul>
            </dd>

            <dt>Amenities</dt>
            <dd>
              <ul className="no-bullet inline-list">
                <AsyncItems
                  loading={this.state.loadingRoomDetails}
                  placeholderMessage="None">
                  {amenities.map(a => <li key={a}>{a}</li>)}
                </AsyncItems>
              </ul>
            </dd>
          </dl>
        </dd>

        <dt>Booking Details</dt>
        <dd>
          <dl>
            <dt>Dates</dt>
            <dd>{formatDateShort(startDate)} to {formatDateShort(endDate)}</dd>

            <dt>Duration</dt>
            <dd>{duration} days</dd>

            <dt>Price Total</dt>
            <dd>${price} &times; {duration} = ${price * duration}</dd>
          </dl>
        </dd>
      </dl>
      <div>
        <button onClick={this.bookRoom}
                className="btn btn--inline"
                type="button">
          Book
        </button>
        <button onClick={onRequestClose}
                className="btn btn--inline"
                type="button">
          Cancel
        </button>
      </div>
    </ReactModal>;
  }
}