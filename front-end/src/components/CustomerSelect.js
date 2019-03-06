import React from "react";
import CustomerRow from "./CustomerAdminComponents/CustomerRow";


export default class CustomerSelect extends React.Component {


  render() {
    const {onChange, customers, value} = this.props;

    return <>
      <input type="hidden" value={value} onChange={onChange}/>
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
        {customers.map(customer =>
          <CustomerRow
            key={customer.id}
            className={customer.id === value && "selected-row"}
            {...customer}
            onSelectRow={onChange}/>)}
        </tbody>
      </table>
    </>
  }
}