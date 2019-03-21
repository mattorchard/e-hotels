import React from "react";
import {AsyncItems} from "../components/AsyncItems";
import CustomerRow from "../components/CustomerAdminComponents/CustomerRow";
import "./CustomerAdminPage.css";
import CustomerModal from "../components/CustomerAdminComponents/CustomerModal";
import CreateEmployeeModal from "../components/EmployeeAdminComponents/CreateEmployeeModal";
import CreateCustomerModal from "../components/CustomerAdminComponents/CreateCustomerModal";


export default class CustomerAdminPage extends React.Component {
  state = {
    loadingCustomers: true,
    customers: [],
    selectedCustomer: null,
    creatingCustomer: false
  };

  async componentDidMount() {
    await this.loadCustomers();
  }

  loadCustomers = async () =>{
    try{
      this.setState({loadingCustomers: true});
      const response = await fetch("/api/customers");
      if (!response.ok) {
        throw new Error(`Unable to get customers ${response.status}`);
      }
      const customers = await response.json();
      this.setState({customers, loadingCustomers: false});
    } catch (error) {
      console.log("Unable to load customers");
      console.log(error);

    }
  };

  openCustomerModal = customer => {
    this.setState({selectedCustomer: customer})
  };


  render() {
    return <main className="main-content">
      <button className="btn fill add-btn"
              type="button"
              onClick={() => this.setState({creatingCustomer: true})}>
        Add Customer
      </button>

      <h2>Customers</h2>
      <div className="horizontal-scroll">
        <table className="customer-table table-spaced">
          <thead className="customer-table__head">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>SSN</th>
            <th>SIN</th>
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
              <CustomerRow key={customer.id} {...customer} onSelectRow={this.openCustomerModal}/>)}

          </AsyncItems>
          </tbody>
        </table>
      </div>
      <CustomerModal
        customer={this.state.selectedCustomer}
        onRequestClose={() => this.setState({selectedCustomer: null})}
        onRequestReload={this.loadCustomers}
        />
      <CreateCustomerModal
        isOpen={this.state.creatingCustomer}
        onRequestClose={() => this.setState({creatingCustomer:false})}
        onRequestReload={this.loadCustomers}/>
    </main>;
  }
}