import React from "react";
import CustomerRow from "./CustomerAdminComponents/CustomerRow";
import {toast} from "react-toastify";
import {AsyncItems} from "./AsyncItems";


export default class CustomerSelect extends React.Component {

  state = {
    loadingCustomers: false,
    customers: []
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
      this.setState({loadingCustomers: false});
    }
  };


  async componentDidMount() {
    await this.loadCustomers();
  }

  render() {
    const {onChange, value} = this.props;
    const {customers, loadingCustomers} = this.state;
    return <>
      <input type="number"
             value={value}
             required
             onChange={() => {}}
             aria-label="Select a customer"
             className="hidden-input"/>
      <table className="input-table">
        <thead className="customer-select__head">
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
        <AsyncItems loading={loadingCustomers} wrapper="table">
          {customers.map(customer =>
            <CustomerRow
              key={customer.id}
              className={customer.id === value && "selected-row"}
              {...customer}
              onSelectRow={onChange}/>)}
        </AsyncItems>
        </tbody>
      </table>
    </>
  }
}