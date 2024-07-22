import React, { useState } from "react";
import Sidebar from "../../../components/Sidebar";
import { useEffect } from "react";
import { axiosInstance } from "../../../lib/axios";
import { Table, Button, Badge } from "react-bootstrap";
import { toast } from "sonner";
import CreateProductModal from "./CreateProductModal";
import EditProductModal from "./EditProductModal";
import withAuth from "../../../hoc/withAuth";
import { useSelector } from "react-redux";
import { confirmAlert } from "react-confirm-alert";

const Product = () => {
  const [productData, setProductData] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const token = useSelector((state) => state.auth.token);

  const getProducts = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axiosInstance.get("/products", { headers });
      setProductData(response.data.data);
      console.log(token);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const result = await axiosInstance.delete(`/products/${id}`, { headers });
      if (result.status === 204) {
        toast.success("Delete Success");
        getProducts();
        // setShowDeleteModal(false)
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Delete Failed");
    }
  };

  // const handleDeleteClick = (customerId) => {
  //   setProductIdDelete(customerId);
  //   setShowDeleteModal(true);
  // };

  const handleDeleteClick = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="bg-light p-4 rounded shadow justify-content-end mt-3 swal2-popup">
          <h3>Confirm delete</h3>
          <p>Apakah kamu yakin untuk menghapus?</p>
          <div className="d-flex justify-content-end mt-3">
            <Button
              className="btn btn-danger me-2"
              onClick={() => {
                deleteProduct(id);
                onClose();
              }}
              data-testid="confirm-delete-button"
            >
              Yes
            </Button>
            <Button
              className="bg-warning swal2-cancel"
              onClick={() => {
                onClose();
              }}
              data-testid="cancel-delete-button"
            >
              Cancel
            </Button>
          </div>
        </div>
      ),
    });
  };

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };

  const handleCreateProduct = (newProduct) => {
    setProductData([...productData, newProduct]);
    getProducts();
  };

  const handleEditClick = (customer) => {
    setSelectedProduct(customer);
    setShowEditModal(true);
  };

  const handleSaveChanges = async (id, updatedData) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const result = await axiosInstance.put(`/products/`, updatedData, {
        headers,
      });
      if (result.status === 200) {
        toast.success("Update Success");
        getProducts();
        setShowEditModal(false);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Update Failed");
    }
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-auto">
          <Sidebar />
        </div>
        <div className="col">
          <div className="text-center container-fluid">
            <h1 data-testid="product-title" className="text-center">
              Product
            </h1>
            <Button
              data-testid="add-product-button"
              onClick={handleCreateClick}
              variant="primary"
            >
              Add Product
            </Button>
            <div className="table-responsive mt-3 display: none">
              <Table>
                <thead className="text-center">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {productData && productData.length > 0 ? (
                    productData.map((product, index) => (
                      <tr key={index}>
                        <td>
                          <Badge pill bg="secondary">{product.id ? product.id.slice(0, 8) : ""}</Badge>
                        </td>
                        <td>
                          <Badge pill bg="secondary">{product.name}</Badge>
                        </td>
                        <td>
                          <Badge pill bg="danger">
                          {new Intl.NumberFormat("id-ID", {
                            style: "currency",
                            currency: "IDR",
                          }).format(product.price)}
                          </Badge>
                          
                        </td>
                        <td>
                          <Badge pill bg="secondary">{product.type}</Badge>
                        </td>
                        <td>
                          <Button
                            data-testid={`edit-product-button-${
                              product.id ? product.id.slice(0, 8) : null
                            }`}
                            onClick={() => handleEditClick(product)}
                            variant="success"
                            className="mx-2"
                          >
                            Edit
                          </Button>
                          <Button
                            data-testid={`delete-product-button-${
                              product.id ? product.id.slice(0, 8) : null
                            }`}
                            onClick={() => handleDeleteClick(product.id)}
                            variant="danger"
                            className="mx-2"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5">No products available</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      <CreateProductModal
        show={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
        handleCreate={handleCreateProduct}
      />

      {setSelectedProduct && (
        <EditProductModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          product={selectedProduct}
          handleSave={handleSaveChanges}
        />
      )}

      {/* <DeleteProductModal
        show={showDeleteModal}
        handleClose={() => setShowDeleteModal(false)}
        handleDelete={() => deleteProduct(productIdDetele)}
      /> */}
    </div>
  );
};

const EnhancedProduct = withAuth(Product);
export default EnhancedProduct;
