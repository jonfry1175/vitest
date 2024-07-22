import React from 'react';
import PropTypes from 'prop-types';
import { Button, Modal } from 'react-bootstrap'

const DeleteProductModal = ({ show, handleClose, handleDelete }) => {
    return (
        <Modal show={show} onHide={handleClose} className="swal2-popup">
            <Modal.Header data-testid="customer-modal-close-button" closeButton>
                <Modal.Title>Delete Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Modal.Footer>
                <Button data-testid='cancel-delete-button' className="swal2-cancel" variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button data-testid='confirm-delete-button' onClick={handleDelete} variant="primary" type="submit">
                    Delete
                </Button>
                </Modal.Footer>
            </Modal.Body>
        </Modal>
    )
}

export default DeleteProductModal

DeleteProductModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  handleDelete: PropTypes.func
}