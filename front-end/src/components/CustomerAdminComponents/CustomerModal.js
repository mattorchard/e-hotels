import React from "react";
import ReactModal from "react-modal";
import {toast} from "react-toastify";
import ConfirmationModal from "../ConfirmationModal";

export default class CustomerModal extends React.Component {
  state = {
    confirmingDeleteCustomer: false
  };
  deleteCustomer = async () => {
    try{
      const response = await fetch (`/api/customers/${this.props.customer.id}`, {method: "DELETE"});
      if (!response.ok){
        throw new Error(`Failed to delete customer ${response.status}`);
      }
      toast.success("Deleted customer");
      this.props.onRequestClose();
      this.props.onRequestReload();
    } catch (error) {
      console.error(error);
      console.error("Unable to delete customer");
    }
  };
  render() {
    const {customer, onRequestClose} = this.props;
    return <ReactModal
      appElement={document.getElementById('root')}
      className="modal-fit-content"
      isOpen={Boolean(customer)}
      onRequestClose={onRequestClose}>
      {customer && <>
        <div className="modal-actions">
          <button onClick={() => this.setState({confirmingDeleteCustomer: true})}
                  type="button"
                  className="btn btn--inline">
                  Delete
          </button>
      </div>

       <ConfirmationModal
       isOpen= {this.state.confirmingDeleteCustomer}
       onCancel={() => this.setState({confirmingDeleteCustomer: false})}
       onConfirm={this.deleteCustomer}>
         Are you sure you want to delete: <strong> {customer.givenName} {customer.familyName}</strong>
       </ConfirmationModal>
      </>}
    </ReactModal>
  }
}

