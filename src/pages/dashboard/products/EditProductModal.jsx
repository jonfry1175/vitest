import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const productFormSchema = z.object({
  id: z.string().trim().min(1, 'is required'),
  name: z.string().trim().min(1, 'Name is required').max(100),
  price: z.preprocess((value) => parseFloat(value), z.number().min(1, 'Price is required')),
  type: z.string().trim().min(1, 'Type is required').max(10),
});

const EditProductModal = ({ show, handleClose, product, handleSave }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      id: "",
      name: "",
      price: "",
      type: "",
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        id: product.id,
        name: product.name,
        price: product.price,
        type: product.type,
      });
    }
  }, [product, reset, show]);

  const onSubmit = (data) => {
    handleSave(product.id, data);
  };

  return (
    <Modal data-testid="add-product-modal" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Product</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              data-testid="product-name-input"
              type="text"
              {...register('name')}
              isInvalid={!!errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.name?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formPrice" className="mt-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              data-testid="product-price-input"
              type="number"
              {...register('price')}
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="formType" className="mt-3">
            <Form.Label>Type</Form.Label>
            <Form.Control
              data-testid="product-type-input"
              type="text"
              {...register('type')}
              isInvalid={!!errors.type}
            />
            <Form.Control.Feedback type="invalid">
              {errors.type?.message}
            </Form.Control.Feedback>
          </Form.Group>
          <Modal.Footer>
            <Button data-testid="close-add-product-modal" variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button data-testid="submit-add-product" variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

EditProductModal.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  product: PropTypes.object,
  handleSave: PropTypes.func,
};

export default EditProductModal;
