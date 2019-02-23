import React from "react";
import {simulateDelay} from "../services/simulator-service";
import CustomerManager from "../components/CustomerComponents/CustomerManager";
import {AsyncItems} from "../components/AsyncItems";

export default class CustomerPage extends React.Component {
  state = {
    loadingCustomers: true,
    customers: []
  };

  async componentDidMount() {
    await simulateDelay(1000);
    const customers = [{sinOrSsn: 808, givenName: "Harvey", familyName: "Treacher"}];
    this.setState({customers, loadingCustomers: false})
  }

  render() {
    return <main className="main-content">
      <h2>Customer Operations</h2>
      <h3>Search Availability</h3>
      <h3>Rooms by Location</h3>
      <h3>Hotel Capacity</h3>
      <h2>Customers</h2>
      <ul>
        <AsyncItems loading={this.state.loadingCustomers}
                   placeholderMessage="No customers"
                   loadingMessage="Loading customers...">
          {this.state.customers.map(customer =>
            <li key={customer.sinOrSsn}><CustomerManager {...customer}/></li>)}
        </AsyncItems>
      </ul>
    </main>;
  }
}