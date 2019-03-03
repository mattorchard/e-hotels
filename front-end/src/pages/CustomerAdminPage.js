import React from "react";
import {AsyncItems} from "../components/AsyncItems";
import CustomerRow from "../components/CustomerComponents/CustomerRow";
import "./CustomerAdminPage.css";


export default class CustomerAdminPage extends React.Component {
  state = {
    loadingCustomers: true,
    customers: []
  };

  async componentDidMount() {
    this.setState({loadingCustomers: true});
    const response = await fetch("/api/customers");
    if (!response.ok) {
      throw new Error(`Unable to get customers ${response.status}`);
    }
    const customers = await response.json();
    this.setState({customers, loadingCustomers: false});
  }


  render() {
    return <main className="main-content">
      <h2>Customers</h2>
      <div className="horizontal-scroll">
        <table className="customer-table table-spaced">
          <thead className="customer-table__head">
          <tr>
            <th>ID</th>
            <th>SIN</th>
            <th>SSN</th>
            <th>Name</th>
            <th>Registered On</th>
            <th>Address</th>
          </tr>
          </thead>
          <tbody>
          <AsyncItems loading={this.state.loadingCustomers}
                      wrapper="table"
                      placeholderMessage="No customers"
                      loadingMessage="Loading customers...">

            {this.state.customers.map(customer =>
              <CustomerRow key={customer.id} {...customer}/>)}

          </AsyncItems>
          </tbody>
        </table>
      </div>
    </main>;
  }
}