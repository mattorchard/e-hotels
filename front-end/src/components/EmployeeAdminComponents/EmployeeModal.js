import React from "react";
import ReactModal from "react-modal";
import {Link} from "react-router-dom";
import EmployeeForm from "./EmployeeForm";
import {toast} from "react-toastify";
import ConfirmationModal from "../ConfirmationModal";

export default class EmployeeModal extends React.Component {

  state = {
    editingEmployee: false,
    confirmingDeleteEmployee: false
  };

  saveEmployee = async employee => {
    const {id} = this.props.employee;
    const response = await fetch(`/api/employees/${id}`, {
      method: "PUT",
      body: JSON.stringify(employee),
      headers: {"Content-Type": "application/json"}
    });
    if (!response.ok) {
      throw new Error(`Unable to save employee: ${employee.givenName} ${employee.familyName}`)
    }
    toast.success(`Updated employee: ${employee.givenName} ${employee.familyName}`);
    this.props.onSave(`employeeId-${id}`);
  };

  deleteEmployee = async () => {
    try {
      const response = await fetch(`/api/employees/${this.props.employee.id}`, {method: "DELETE"});
      if (!response.ok) {
        throw new Error(`Failed to delete employee ${response.status}`);
      }
      toast.success("Deleted employee");
      this.props.onSave();
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete employee");
    }
  };


  render() {
    const {employee, ...modalProps} = this.props;
    const {id, givenName, familyName} = employee || {};
    return <ReactModal
      contentLabel={`Selected Employee: ${givenName} ${familyName}`}
      isOpen={Boolean(employee)}
      onAfterOpen={() => this.setState({editingEmployee: false})}
      appElement={document.getElementById('root')}
      className="modal-fit-content"
      {...modalProps}>

      {employee && <>
        <div className="employee-modal__actions">
          <div className={`wrapper ${this.state.editingEmployee && "hidden"}`}>
            <Link to={`/employee/${id}`}
                  className="btn btn--inline fill">
              Login&nbsp;as
            </Link>
            <button onClick={() => this.setState({editingEmployee: true})}
                    type="button"
                    className="btn btn--inline">
              Edit
            </button>
            <button onClick={() => this.setState({confirmingDeleteEmployee: true})}
              type="button"
              className="btn btn--inline">
              Delete
            </button>
          </div>
          <button onClick={modalProps.onRequestClose}
                  type="button"
                  className="btn btn--inline">
            Cancel
          </button>
        </div>

        <EmployeeForm
          disabled={!this.state.editingEmployee}
          employee={employee}
          onSubmit={this.saveEmployee}/>


        <ConfirmationModal
          isOpen={this.state.confirmingDeleteEmployee}
          onCancel={() => this.setState({confirmingDeleteEmployee: false})}
          onConfirm={this.deleteEmployee}>
          Are you sure you want to delete: <strong>{givenName} {familyName}</strong>
        </ConfirmationModal>
      </>}
    </ReactModal>
  }
}