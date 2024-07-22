import React from "react";
import PropTypes from "prop-types";
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "sonner";
import { axiosInstance } from "../../../lib/axios";
import { useSelector } from "react-redux";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// eslint-disable-next-line react-refresh/only-export-components
const customerFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  address: z.string().trim().min(1, "Address is required"),
});

const CreateCustomerModal = ({ show, handleClose, handleCreate }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(customerFormSchema),
    defaultValues: {
      name: "",
      phoneNumber: "",
      address: "",
    },
  });

  const token = useSelector((state) => state.auth.token);

  const onSubmit = async (data) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.post("/customers/", data, {
        headers,
      });
      if (response.status === 201) {
        toast.success("Customer Created Successfully");
        handleCreate(response.data);
        reset();
        handleClose();
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to create customer");
    }
  };

  return (
    <Modal data-testid="customer-modal" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Create Customer</Modal.Title>
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
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

CreateCustomerModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  handleCreate: PropTypes.func,
};

export default CreateCustomerModal;
