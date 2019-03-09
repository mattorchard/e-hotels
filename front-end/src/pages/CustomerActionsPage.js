import React from "react";
import {toast} from "react-toastify";
import "./CustomerActionsPage.css"
import AccountContext from "../contexts/AccountContext";
import BookingSearch from "../components/CustomerActionsComponents/BookingSearch";
import RoomsByArea from "../components/CustomerActionsComponents/RoomsByArea";


export default class CustomerActionsPage extends React.Component {
  static contextType = AccountContext;

  async componentDidMount() {
    const {customerId} = this.props.match.params;
    try {
      const response = await fetch(`/api/customers/${customerId}`);
      if (!response.ok) {
        throw new Error(`Unable to fetch customer ${response.status}`);
      }
      const {givenName, familyName} = await response.json();
      this.context.setAccount({accountType: "customer", givenName, familyName, customerId});
    }
    catch (error) {
      console.error("Unable to login as customer", error);
      toast.error("Unable to login");
    }
  }

  render() {
    const {customerId, givenName, familyName} = this.context.account;
    return <main className="main-content main-content--clear">
      {customerId ? <>
        <h2>Logged in as {givenName}, {familyName}</h2>
        <RoomsByArea />
        <BookingSearch customerId={customerId}/>
      </> : <p className="spinner">Logging in...</p>}
    </main>
  }
}