import React, { useState, useEffect } from "react";
import Sidebar from "../../../components/Sidebar";
import { Button, Table, Modal, Form } from "react-bootstrap";
import { axiosInstance } from "../../../lib/axios";
import withAuth from "../../../hoc/withAuth";
import { useSelector } from "react-redux";
import { toast } from "sonner";


const Transactions = () => {
  const [customerDataTransaction, setCustomerDataTransaction] = useState([]);
  const [productData, setProductData] = useState([]);
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModalDetail, setShowModalDetail] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [selectedCustomerId, setSelectedCustomerId] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState("");

  const token = useSelector((state) => state.auth.token);

  const getTransactions = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.get("/bills", { headers });
      const transactions = response.data.data;

      const newCustomerDataTransaction = {};

      transactions.forEach((transaction) => {
        const customerId = transaction.customer.id;

        // jika customerId belum ada di objek newCustomerDataTransaction, tambahkan property baru
        if (!newCustomerDataTransaction[customerId]) {
          newCustomerDataTransaction[customerId] = {
            ...transaction.customer, // copy semua properti customer
            transactions: [], // tambahkan properti transactions yang menampung daftar transaksi dari response.data.data
            transactionCount: 0, // tambahkan properti transactionCount untuk menghitung jumlah transaksi
          };
        }
        // Tambahkan transaksi ke daftar transaksi pelanggan
        newCustomerDataTransaction[customerId].transactions.push(transaction);
        // Tingkatkan jumlah transaksi pelanggan
        newCustomerDataTransaction[customerId].transactionCount += 1;
      });

      setCustomerDataTransaction(newCustomerDataTransaction);
      console.log(token);
      console.log(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const check = () => {
    console.log(customerDataTransaction);
  };

  // get product data
  const getProducts = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axiosInstance.get("/products", { headers });
      setProductData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  // get customer data
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

  // TODO: create Transaction
  const createTransaction = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const payload = {
        customerId: selectedCustomerId,
        billDetails: [
          {
            product: {
              id: selectedProduct,
            },
            qty: quantity,
          },
        ],
      };
      const response = await axiosInstance.post("/bills", payload, { headers });

      if (response.status === 201) {
        toast.success("Transaction Created Successfully");
      } else {
        toast.error("Transaction Failed");
      }
      console.log(response.data.data);
      console.log(payload);
      getTransactions();
      setShowModalCreate(false);
    } catch (error) {
      if (error?.response?.data?.status?.description) {
        toast.error("Wajib Login Menggunakan Akun Admin");
      } else {

        console.log(error.message);
        toast.error("Create Transaction Failed");
      }
    }
  };

  // ambil detail by customer id
  const handleClick = (customerDataTransaction) => {
    setShowModalDetail(true);
    setSelectedCustomer(customerDataTransaction);
    console.log(customerDataTransaction);
  };

  useEffect(() => {
    getTransactions();
    getProducts();
    getCustomers();
  }, []);

  return (
    <div>
      <div className="row">
        <div className="col-auto ">
          <Sidebar />
        </div>
        <div className="col">
          <div className="text-center container-fluid xzy">
            <h1 data-testid="transaction-title">Transaction Page</h1>
            <Button onClick={check} variant="primary" className="me-3">
              Cek Transaksi
            </Button>
            <Button onClick={() => setShowModalCreate(true)}>
              Tambah Transaksi
            </Button>
            <div className="table-responsive mt-3">
              <Table striped bordered hover>
                <thead className="text-center">
                  <tr>
                    <th>#</th>
                    <th>Kode Pelanggan</th>
                    <th>Nama Pelanggan</th>
                    <th>Label Transaksi</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(customerDataTransaction).map((customer, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{customer.id}</td>
                      <td>
                        <span className="fw-bold">{customer.name}</span>
                        <br />
                        {customer.transactionCount} Transaksi
                      </td>
                      <td>
                        <Button
                          onClick={() => handleClick(customer)}
                          variant="primary"
                        >
                          Detail
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Detail Transaksi */}
      <Modal show={showModalDetail} onHide={() => setShowModalDetail(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            Riwayat Transaksi a.n {selectedCustomer?.name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedCustomer && (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Kode Transaksi</th>
                  <th>Tanggal Transaksi</th>
                  <th>QTY</th>
                  <th>Jenis Laundry</th>
                  <th>Total Harga</th>
                </tr>
              </thead>
              <tbody>
                {selectedCustomer.transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>{transaction.billDate}</td>
                    <td>
                      {transaction.billDetails.reduce(
                        (acc, item) => acc + item.qty,
                        0
                      )}{" "}
                      {transaction.billDetails.map((item) => item.product.type)}
                    </td>
                    <td>
                      {transaction.billDetails.map((item) => item.product.name)}
                    </td>
                    <td>
                      {transaction.billDetails
                        .reduce((acc, item) => acc + item.price * item.qty, 0)
                        .toLocaleString('id-ID', {
                          style: 'currency',
                          currency: 'IDR',
                        })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalDetail(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal Create Transaction */}
      <Modal show={showModalCreate} onHide={() => setShowModalCreate(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nama Konsumen</Form.Label>
              <Form.Control
                as="select"
                value={selectedCustomerId}
                onChange={(e) => setSelectedCustomerId(e.target.value)}
              >
                <option value="">Pilih Nama Konsumen</option>
                {customerData.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pilih Paket Laundry</Form.Label>
              <Form.Control
                as="select"
                value={selectedProduct}
                onChange={(e) => setSelectedProduct(e.target.value)}
              >
                <option value="">Pilih Paket Laundry</option>
                {productData.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Qty (Kg)</Form.Label>
              <Form.Control
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModalCreate(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={createTransaction}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

const EnhancedTransactions = withAuth(Transactions)
export default EnhancedTransactions;
