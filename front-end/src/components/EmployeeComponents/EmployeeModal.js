import React from "react";
import ReactModal from "react-modal";
import {Link} from "react-router-dom";
import EmployeeForm from "./EmployeeForm";


export default class EmployeeModal extends React.Component {

  state = {
    editingEmployee: false
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
      <div className="employee-modal__actions">
        {this.state.editingEmployee || <>
          <button onClick={() => this.setState({editingEmployee: true})}
                  type="button"
                  className="btn btn--inline">
            Edit
          </button>
          <button
            type="button"
            className="btn btn--inline">
            Delete
          </button>
          <Link to={`/employee/${id}`}
                className="btn btn--inline">
            Login as
          </Link>
        </>}
        <button onClick={modalProps.onRequestClose}
                type="button"
                className="btn btn--inline">
          Cancel
        </button>
      </div>
      <EmployeeForm disabled={!this.state.editingEmployee} employee={employee}/>
    </ReactModal>
  }
}