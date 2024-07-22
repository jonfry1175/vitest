import React, { useState } from "react";
import "./sidebar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { confirmAlert } from 'react-confirm-alert';
import { toast } from "sonner";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const { pathname } = useLocation();
  console.log(pathname);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    toast.success("Logout Success");
    navigate("/");
  };

  const handleLogoutClick = () => {
    confirmAlert({
      title: 'Confirm to Logout',
      message: 'Apakah kamu yakin untuk keluar?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleLogout()
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  return (
    <div
      className={`bg-dark min-vh-100 d-flex flex-column justify-content-between sidebar ${
        isOpen ? "open" : "closed"
      }`}
    >
      <div>
        <button
          className="btn m-2 btn-primary my-3"
          type="button"
          onClick={toggleSidebar}
        >
          <i className="bi bi-list"></i>
        </button>

        <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
          <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
            <Link 
              to={"/"}
              className={`${pathname === '/' ? 'active' : ''} nav-link fs-5`}
            >
              <i className="fs-4 bi bi-speedometer2"></i>
              <span className="ms-3">Dashboard</span>
            </Link>
          </li>
        </ul>
        <hr className="text-secondary d-none d-sm-block" />
        <ul className="nav nav-pills flex-column mt-3 mt-sm-0">
          <li className="nav-item text-white fs-4 my-1 py-2 py-sm-0">
            <Link 
              to={"/customers"}
              className={`${pathname === '/customers' ? 'active' : ''} nav-link fs-5`}
            >
              <i className="bi bi-people"></i>
              <span className="ms-3">Customers</span>
            </Link>
          </li>
          <li className="nav-item fs-4 my-1 py-2 py-sm-0">
            <Link 
              to={"/products"}
              className={`${pathname === '/products' ? 'active' : ''} nav-link fs-5`}
            >
              <i className="bi bi-bar-chart"></i>
              <span className="ms-3">Products</span>
            </Link>
          </li>
          <li className="nav-item fs-4 my-1 py-2 py-sm-0">
            <Link 
              to={"/transaction"}
              className={`${pathname === '/transaction' ? 'active' : ''} nav-link fs-5`}
            >
              <i className="bi bi-credit-card"></i>
              <span className="ms-3">Transactions</span>
            </Link>
          </li>
        </ul>
      </div>
      <div className="dropdown open p-3">
        <a
          className="text-decoration-none text-white d-flex align-items-center dropdown-toggle"
          id="triggerId"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          role="button"
          href="#"
        >
          <i className="bi bi-person-circle"></i>
          <span className="ms-2">User</span>
        </a>
        <div className="dropdown-menu" aria-labelledby="triggerId">
          <Link to={"/"} className="dropdown-item">
            Home
          </Link>
          <Button 
            onClick={handleLogoutClick}
            className="dropdown-item"
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
