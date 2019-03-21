import React from "react";
import {toast} from "react-toastify";
import "./CustomerActionsPage.css"
import BookingSearch from "../components/CustomerActionsComponents/BookingSearch";
import RoomsByArea from "../components/CustomerActionsComponents/RoomsByArea";


export default class CustomerActionsPage extends React.Component {
  state = {
    loadingCustomer: true,
    customer: null
  };


  async componentDidMount() {
    const {customerId} = this.props.match.params;
    try {
      this.setState({loadingCustomer: true});
      const response = await fetch(`/api/customers/${customerId}`);
      if (!response.ok) {
        throw new Error(`Unable to fetch customer ${response.status}`);
      }
      const customer = await response.json();
      this.setState({customer, loadingCustomer: false});
    }
    catch (error) {
      console.error("Unable to login as customer", error);
      toast.error("Unable to login");
      this.setState({loadingCustomer: false});
    }
  }

  render() {
    if (this.state.loadingCustomer) {
      return <p className="spinner">Logging in...</p>;
    } else if (!this.state.customer) {
      return <p>Unable to load customer</p>
    }

    const {id: customerId, givenName, familyName} = this.state.customer;

    return <main className="main-content main-content--clear">
      <h2>Logged in as {givenName}, {familyName}</h2>
      <RoomsByArea />
      <BookingSearch customerId={customerId}/>
    </main>
  }
}