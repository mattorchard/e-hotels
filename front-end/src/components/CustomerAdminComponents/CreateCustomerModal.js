import React from "react";
import ReactModal from "react-modal";
import {toast} from "react-toastify";
import CustomerForm from "./CustomerForm";

export default class CreateCustomerModal extends React.Component {
  saveCustomer = async customer => {
    try {
      const response = await fetch("/api/customers", {
        method: "POST",
        body: JSON.stringify(customer),
        headers: {"Content-Type": "application/json"}
      });
      if (!response.ok) {
        throw new Error(`Unable to save customer: ${response.status}`);
      }
      toast.success(`Created Customer: ${customer.givenName} ${customer.familyName}`);
      this.props.onRequestClose();
      this.props.onRequestReload();
    } catch (error) {
      console.error("Unable to create customer", error);
      toast.error("Unable to create customer");
    }
  };

  render() {
    const {isOpen, onRequestClose} = this.props;

    return <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      appElement={document.getElementById('root')}
      className="modal-fit-content">

      <div className="modal-actions">
        <button onClick={onRequestClose}
                className="btn btn--inline"
                type="button">
          Cancel
        </button>
      </div>
      <CustomerForm onSubmit={this.saveCustomer}/>
    </ReactModal>
  }
}