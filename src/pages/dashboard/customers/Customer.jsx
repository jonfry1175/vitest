import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import { axiosInstance } from "../../../lib/axios";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "sonner";
import EditCustomerModal from "./EditCustomerModal"; 
import CreateCustomerModal from "./CreateCustomerModal";
import Sidebar from "../../../components/Sidebar";
import { useSelector } from "react-redux";
import withAuth from "../../../hoc/withAuth";

import './customers.css'

const Customer = () => {
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const token = useSelector((state) => state.auth.token);

  const getCustomers = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.get("/customers", { headers });
      setCustomerData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteCustomer = async (id) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const result = await axiosInstance.delete(`/customers/${id}`, { headers });
      
      if(result.status === 204) {
        toast.success("Delete Success");
        getCustomers();
      }
    } catch (error) {
        console.log(error.message)
    }
  }

  const handleDeleteClick = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => (
        <div className="bg-light p-4 rounded shadow justify-content-end mt-3">
          <h3>Confirm delete</h3>
          <p>Apakah kamu yakin untuk menghapus?</p>
          <div className="d-flex justify-content-end mt-3">
            <Button
              className="btn btn-danger me-2"
              onClick={() => {
                deleteCustomer(id);
                onClose()
              }}
              data-testid="confirm-delete-button"
            >
              Yes
            </Button>
            <Button
              className="bg-warning"
              onClick={() => {
                onClose()
              }}
              data-testid="cancel-delete-button"
            >
              Cancel
            </Button>
          </div>
        </div>
      )
    });
  };
  
  const handleEditClick = (customerId) => {
    setSelectedCustomer(customerId);
    setShowEditModal(true);
  }

  const handleSaveChanges = async (id, updatedData) => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const result = await axiosInstance.put(`/customers/`, updatedData, { headers });
      
      if (result.status === 200) {
        toast.success("Update Success");
        getCustomers();
        setShowEditModal(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleCreateClick = () => {
    setShowCreateModal(true);
  };


  const handleCreateCustomer = (newCustomer) => {
    setCustomerData([...customerData, newCustomer]);
    getCustomers();
  };


  useEffect(() => {
    getCustomers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="row">
      <div className="col-md-auto">
        <Sidebar />
      </div>
      <div className="col">
        <div className="text-center container-fluid xyz">
          <h1 data-testid="customer-title">Customer Page</h1>
          <Button data-testid="add-customer-button" variant="primary" onClick={handleCreateClick}>
            Create Customer
          </Button>
          <div className="table-responsive mt-3">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Address</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {customerData && customerData.length > 0 ? (
                  customerData.map((customer, index) => (
                    <tr key={index}>
                      <td>{customer.id ? customer.id.slice(0, 8) : ''}</td>
                      <td>{customer.name}</td>
                      <td>{customer.phoneNumber}</td>
                      <td>{customer.address}</td>
                      <td>
                        <Button
                          data-testid={`edit-customer-button-${customer.id}`}
                          onClick={() => handleEditClick(customer)}
                          variant="success"
                          className="mx-2"
                        >
                          Edit
                        </Button>
                        <Button
                          data-testid={`delete-customer-button-${customer.id}`}
                          onClick={() => handleDeleteClick(customer.id)}
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
                    <td colSpan="5">No customers available</td>
                  </tr>
                )}

              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </div>

      

      {selectedCustomer && (
        <EditCustomerModal
          show={showEditModal}
          handleClose={() => setShowEditModal(false)}
          customer={selectedCustomer}
          handleSave={handleSaveChanges}
        />
      )}

       <CreateCustomerModal
        show={showCreateModal}
        handleClose={() => setShowCreateModal(false)}
        handleCreate={handleCreateCustomer}
      />

    </>
  );
};

const EnhancedCustomer = withAuth(Customer)
export default EnhancedCustomer;
