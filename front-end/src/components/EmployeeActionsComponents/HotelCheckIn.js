import React from "react";
import Address from "../Address";
import Stars from "../Stars";
import CreateRenting from "./CreateRenting";
import {toast} from "react-toastify";


export default class HotelCheckIn extends React.Component {

  state = {
    creatingRenting: false,
    loadingCustomers: false,
    customers: []
  };

  openCreateRentingForm = async() => {
    this.setState({creatingRenting: true});
    await this.loadCustomers();
  };

  loadCustomers = async () => {
    this.setState({loadingCustomers: true});
    try {
      const response = await fetch("/api/customers");
      if (!response.ok) {
        throw Error(`Unable to fetch customers ${response.status}`);
      }
      const customers = await response.json();
      this.setState({customers, loadingCustomers: false});
    } catch (error) {
      console.error(error);
      toast.error("Unable to fetch customers");
      this.setState({creatingRenting: false, loadingCustomers: false});
    }
  };

  render() {
    const {hotel, hotelChainName} = this.props;
    const {category, address, manager} = hotel;
    return <section className="large-card">
      <div className="check-in-card__head">
        <div>
          <strong><Address {...address}/></strong>
          <div>
            Manager: {manager.givenName} {manager.familyName}
          </div>
          <form>
            <Stars disabled number={category} name="radio-stars"/>
          </form>
        </div>
        <button
          type="button"
          className="btn fill">
          Check In
        </button>
      </div>
      {this.state.creatingRenting ?
        this.state.loadingCustomers ?
          <p className="spinner">
            Loading customers...
          </p> : <CreateRenting
          hotelId={hotel.id}
          hotelChainName={hotelChainName}
          customers={this.state.customers}
          onRequestClose={() => this.setState({creatingRenting: false})}/> :
        <button
          type="button"
          className="btn"
          onClick={this.openCreateRentingForm}>
          Rent without booking
        </button>}

    </section>
  }
}