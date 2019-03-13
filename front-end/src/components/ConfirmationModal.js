import React from "react";
import ReactModal from "react-modal";

const ConfirmationModal = ({children, isOpen, onConfirm, onCancel}) => <ReactModal
  isOpen={isOpen}
  appElement={document.getElementById('root')}
  onRequestClose={onCancel}
  className="modal-fit-content">

  {children || "Are you sure?"}

  <div>
    <button onClick={onConfirm}
            className="btn fill"
            type="button">
      Confirm
    </button>
    <button onClick={onCancel}
            className="btn"
            type="button">
      Cancel
    </button>
  </div>

</ReactModal>;

export default ConfirmationModal;