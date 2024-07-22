import React, { useState } from "react";
import NavBar from "../components/NavBar";
import "../App.css";
import adventure from "../assets/adventure.svg";
import discount from "../assets/discount.svg";
import sertificate from "../assets/sertificate.svg";
import solution from "../assets/solution.svg";
import contact from "../assets/contact.svg";
import Footer from "../components/Footer";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { Button } from "react-bootstrap";

const HomePage = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const [inputPromo, setInputPromo] = useState("");

  const handleSubmit = () => {
    if (inputPromo.length < 4) {
      toast.error("Minimum 4 karakter");
      return; // Stop function execution if input length is less than 4
    }
    toast.info("Mohon maaf, Fitur ini sedang dalam tahap pengembangan.");
    setInputPromo("");
  };

  const handleServices = () => {
    navigate("/dashboard-customers");
  }

  const token = useSelector((state) => state.auth.token);
  const cekTokenRedux = () => {
    console.log(token)
  };

  return (
    <div>
      <NavBar />
      
    
      {/* Header */}
      <section className="p-5 m-5 text-center text-sm-start">
        <div className="container">
          <div className="d-flex align-items-center">
            <div>
              <h1>
                <span className="text-success">Kebersihan</span> Membuat{" "}
                <span className="text-success">Perbedaan</span>
              </h1>
              <p className="lead">
                Pilih <span className="text-danger fw-bold">Kualitas</span>,
                Pilih{" "}
                <span className="text-danger fw-bold">Enigma Laundry</span>
              </p>
              <button onClick={handleServices} className="btn btn-primary btn-lg">
                {isAuth ? "Buka Dashboard" : "Telusuri Layanan"}
              </button>
              <Button onClick={cekTokenRedux}>Cek redux</Button>
            </div>
            <img
              className="img-fluid w-50 d-none d-sm-block"
              src={adventure}
              alt="Adventure"
            />
          </div>
        </div>
      </section>

      {/* Services */}
      <h2 className="text-center text-bold">Layanan Kami</h2>
      <section className="container pt-4" id="services">
        <div className="row text-center p-2">
          <div className="col-lg-4 col-md-6 col-sm-12 mx-auto g-2 bg-light text-dark">
            <div className="card">
              <img src={discount} className="card-img-top" alt="Navigating" />
              <div className="card-body">
                <h5 className="card-title">harga terjangkau</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mx-auto g-2">
            <div className="card">
              <img src={solution} className="card-img-top" alt="Moments" />
              <div className="card-body">
                <h5 className="card-title">Fasilitas Terbaik</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 col-sm-12 mx-auto g-2 bg-light text-dark">
            <div className="card">
              <img src={sertificate} className="card-img-top" alt="Pesawat" />
              <div className="card-body">
                <h5 className="card-title">Tersertivikasi</h5>
                <p className="card-text">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo */}
      <section className="bg-primary text-light p-5" id="promo">
        <div className="cotainer">
          <div className="d-md-flex justify-content-between align-items-center">
            <h3>Dapatkan Promo Menarik</h3>

            <div className="input-group mt-3 mt-md-0">
              <input
                onChange={(e) => setInputPromo(e.target.value)}
                value={inputPromo}
                type="text"
                className="form-control"
                placeholder="masukkan kode voucher"
              />
              <button
                onClick={handleSubmit}
                className="btn btn-dark btn-lg"
                type="submit"
              >
                submit
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="p-5" id="contact">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-md">
              <h2 className="text-center mb-4">Contact Us</h2>
              <ul className="list-group-flush lead">
                <li className="list-group-item pb-1">
                  <i className="bi bi-geo-alt"></i>
                  <span className="fw-bold">Location:</span>
                  Jalan Sutomo, 11
                </li>

                <li className="list-group-item pb-1">
                  <i className="bi bi-telephone"></i>
                  <span className="fw-bold">Mobile Phone:</span>
                  (+62) 821-1234-5678
                </li>
                <li className="list-group-item">
                  <i className="bi bi-instagram"></i>
                  <span className="fw-bold">Instagram:</span>
                  @enigmacamp
                </li>
                <li className="list-group-item">
                  <i className="bi bi-envelope"></i>
                  <span className="fw-bold">Email:</span>
                  enigmacamp@gmail.com
                </li>
              </ul>
            </div>
            <div className="col-md">
              <img
                className="img-fluid d-none d-md-block"
                src={contact}
                alt="contact"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
