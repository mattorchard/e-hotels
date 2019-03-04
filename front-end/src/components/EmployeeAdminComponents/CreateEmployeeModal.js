import React from "react";
import ReactModal from "react-modal";
import EmployeeForm from "./EmployeeForm";
import {toast} from "react-toastify";

export default class EmployeeModal extends React.Component {
  state = {};

  saveEmployee = async employee => {
    const response = await fetch("/api/employee", {method: "POST", body: employee});
    if (!response.ok) {
      throw new Error(`Unable to save employee: ${employee.givenName} ${employee.familyName}`)
    }
    toast.success(`Saved employee: ${employee.givenName} ${employee.familyName}`);
    this.props.onSave();
  };


  render() {
    const {isOpen, hotelChainName, onRequestClose} = this.props;
    return <ReactModal
      contentLabel={`Creating Employee for ${hotelChainName}`}
      isOpen={isOpen}
      appElement={document.getElementById('root')}
      className="modal-fit-content">

      <button onClick={onRequestClose}
              className="btn btn--inline"
              type="button">
        Cancel
      </button>

      <EmployeeForm employee={{hotelChainName}} onSubmit={this.saveEmployee}/>

    </ReactModal>
  }
}