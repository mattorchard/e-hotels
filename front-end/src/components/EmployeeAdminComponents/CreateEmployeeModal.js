import React from "react";
import ReactModal from "react-modal";
import EmployeeForm from "./EmployeeForm";
import {toast} from "react-toastify";

export default class EmployeeModal extends React.Component {
  state = {};

  saveEmployee = async employee => {
    const response = await fetch("/api/employee", {
      method: "POST",
      body: JSON.stringify(employee),
      headers: {"Content-Type": "application/json"}
    });
    if (!response.ok) {
      throw new Error(`Unable to save employee: ${employee.givenName} ${employee.familyName}`)
    }
    const {id} = await response.json();
    toast.success(`Created Employee: ${employee.givenName} ${employee.familyName}`);
    this.props.onSave(`employeeId-${id}`);
  };


  render() {
    const {isOpen, hotelChainName, onRequestClose} = this.props;

    return <ReactModal
      contentLabel={`Creating Employee for ${hotelChainName}`}
      isOpen={isOpen}
      appElement={document.getElementById('root')}
      className="modal-fit-content">

      <div className="employee-modal__actions">
        <button onClick={onRequestClose}
                className="btn btn--inline"
                type="button">
          Cancel
        </button>
      </div>

      <EmployeeForm employee={{hotelChainName}} onSubmit={this.saveEmployee}/>

    </ReactModal>
  }
}