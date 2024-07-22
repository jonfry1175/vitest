import React from "react";
import PropTypes from 'prop-types';
import { Modal, Button, Form } from "react-bootstrap";
import { toast } from "sonner";
import { axiosInstance } from "../../../lib/axios";
import { useSelector } from "react-redux";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const productFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  price: z.preprocess((value) => parseFloat(value), z.number().min(1, 'Price is required')),
  type: z.string().trim().min(1, 'Type is required'),
});

const CreateProductModal = ({ show, handleClose, handleCreate }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      name: "",
      price: "",
      type: "",
    },
  });

  const token = useSelector((state) => state.auth.token);

  const onSubmit = async (data) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.post("/products/", data, { headers });
      if (response.status === 201) {
        toast.success("Product Created Successfully");
        handleCreate(response.data);
        reset();
        handleClose(); 
      }
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("Wajib Login Menggunakan Akun Admin");
      } else {
        console.error(error.message);
        toast.error("Product Creation Failed");
      }
    }
  };

  return (
    <Modal data-testid="add-product-modal" show={show} onHide={handleClose}>
      <Modal.Header  closeButton>
        <Modal.Title>Create Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              data-testid="product-name-input"
              type="text"
              {...register("name")}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid" data-testid="name-error">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPrice" className="mt-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              data-testid="product-price-input"
              type="number"
              step="0.01"
              {...register("price")}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid" data-testid="price-error">
              {errors.price?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formType" className="mt-3">
            <Form.Label>Type</Form.Label>
            <Form.Control
              data-testid="product-type-input"
              type="text"
              {...register("type")}
              isInvalid={!!errors.type}
            />
            <Form.Control.Feedback type="invalid" data-testid="type-error">
              {errors.type?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button data-testid="close-add-product-modal" variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button data-testid="submit-add-product" variant="primary" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

CreateProductModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  handleCreate: PropTypes.func,
};

export default CreateProductModal;
