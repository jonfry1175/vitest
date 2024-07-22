import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const customerFormSchema = z.object({
  id: z.string().trim().min(1, "is required"),
  name: z.string().trim().min(1, "Name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  address: z.string().trim().min(1, "Address is required"),
});

const EditCustomerModal = ({ show, handleClose, customer, handleSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      id: "",
      name: "",
      phoneNumber: "",
      address: "",
    },
  });

  // Reset form values when customer or show changes
  useEffect(() => {
    if (show && customer) {
      reset({
        id: customer.id,
        name: customer.name,
        phoneNumber: customer.phoneNumber,
        address: customer.address,
      });
    }
  }, [show, customer, reset]);

  const onSubmit = (data) => {
    handleSave(customer.id, data);
  };

  return (
    <Modal data-testid="customer-modal" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              data-testid="customer-modal-name-input"
              type="text"
              {...register("name")}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPhoneNumber" className="mt-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              data-testid="customer-modal-phone-input"
              type="text"
              {...register("phoneNumber")}
              isInvalid={!!errors.phoneNumber}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phoneNumber?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formAddress" className="mt-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              data-testid="customer-modal-address-input"
              type="text"
              {...register("address")}
              isInvalid={!!errors.address}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button
              data-testid="customer-modal-close-button"
              variant="secondary"
              onClick={handleClose}
            >
              Close
            </Button>
            <Button
              data-testid="customer-modal-submit"
              variant="primary"
              type="submit"
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

EditCustomerModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  customer: PropTypes.object.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default EditCustomerModal;
