import React from "react";
import ReactModal from "react-modal";
import {toast} from "react-toastify";
import ConfirmationModal from "../ConfirmationModal";
import CustomerForm from "./CustomerForm";
import Link from "react-router-dom/es/Link";

export default class CustomerModal extends React.Component {
  state = {
    confirmingDeleteCustomer: false,
    editingCustomer: false
  };
  deleteCustomer = async () => {
    try {
      const response = await fetch(`/api/customers/${this.props.customer.id}`, {method: "DELETE"});
      if (!response.ok) {
        throw new Error(`Failed to delete customer ${response.status}`);
      }
      toast.success("Deleted customer");
      this.props.onRequestClose();
      this.props.onRequestReload();
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete customer");
    }
  };

  saveCustomer = async customer => {
    const {id} = this.props.customer;
    try {
      const response = await fetch(`/api/customers/${id}`, {
        method: "PUT",
        body: JSON.stringify(customer),
        headers: {"Content-Type": "application/json"}
      });
      if (!response.ok) {
        throw new Error(`Unable to save customer: ${customer.givenName} ${customer.familyName}`);
      }
      toast.success(`Updated customer: ${customer.givenName} ${customer.familyName}`);
      this.props.onRequestClose();
      this.props.onRequestReload();
    } catch (error) {
      toast.error("Unable to save customer");

    }
  };

  render() {
    const {customer, onRequestClose} = this.props;
    const {id, givenName, familyName} = customer || {};
    return <ReactModal
      contentLabel = {`Selected Customer: ${givenName} ${familyName}`}
      appElement={document.getElementById('root')}
      className="modal-fit-content"
      isOpen={Boolean(customer)}
      onAfterOpen={() => this.setState({editingCustomer: false})}
      onRequestClose={onRequestClose}>
      {customer && <>
        <div className="modal-actions">
          <div className={`wrapper ${this.state.editingEmployee && "hidden"}`}>
            <Link to={`/customer/${id}`}
                  className="btn btn--inline fill">
              Login&nbsp;as
            </Link>
            <button onClick={() => this.setState({confirmingDeleteCustomer: true})}
                    type="button"
                    className="btn btn--inline">
              Delete
            </button>
            <button onClick={() => this.setState({editingCustomer: true})}
                    type="button"
                    className="btn btn--inline">
              Edit
            </button>
          </div>
          <button onClick={onRequestClose}
                  type="button"
                  className="btn btn--inline">
            Cancel
          </button>
        </div>

        <CustomerForm
          disabled={!this.state.editingCustomer}
          initialCustomer={customer}
          onSubmit={this.saveCustomer}/>


        <ConfirmationModal
          isOpen={this.state.confirmingDeleteCustomer}
          onCancel={() => this.setState({confirmingDeleteCustomer: false})}
          onConfirm={this.deleteCustomer}>
          Are you sure you want to delete: <strong> {customer.givenName} {customer.familyName}</strong>
        </ConfirmationModal>
      </>}
    </ReactModal>
  }
}

