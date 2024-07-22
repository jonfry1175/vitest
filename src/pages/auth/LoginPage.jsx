import React from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "./style.css";
import { Link, Navigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { axiosInstance } from "../../lib/axios";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const validateForm = z.object({
  username: z.string().min(5, "Username must be at least 5 characters"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector((state) => state.auth.isAuthenticated)

  const form = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(validateForm),
  });

  const LoginUser = async (data) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      const token = response.data.data.token;

      if (response.data.status.code === 201) {
        localStorage.setItem("token", token);
        dispatch({ type: "SET_TOKEN", token });
        toast.success("Login Success");
        navigate("/");
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      if(error.response.data.status) {
        toast.error("invalid username or password");
      } else {
        toast.error("server error");
      }
      console.log(error.message);
    }
  };

  if (isAuth) {
    return <Navigate to={"/"} />
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light login-page">
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={4} className="login-form-container">
            <div className="text-center mb-4">
              <h2 data-testid="login-title">Login</h2>
            </div>
            <Form onSubmit={form.handleSubmit(LoginUser)}>
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Controller
                  control={form.control}
                  name="username"
                  render={({ field, fieldState }) => {
                    return (
                      <div>
                        <Form.Control
                          {...field}
                          data-testid="username-input"
                          type="text"
                          placeholder="Enter username"
                          isInvalid={Boolean(fieldState.error)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {fieldState.error && fieldState.error.message}
                        </Form.Control.Feedback>
                      </div>
                    );
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Kata Sandi</Form.Label>
                <Controller
                  control={form.control}
                  name="password"
                  render={({ field, fieldState }) => {
                    return (
                      <div>
                        <Form.Control
                          data-testid="password-input"
                          {...field}
                          type="password"
                          placeholder="Enter password"
                          isInvalid={Boolean(fieldState.error)}
                        />
                        <Form.Control.Feedback type="invalid">
                          {fieldState.error && fieldState.error.message}
                        </Form.Control.Feedback>
                      </div>
                    );
                  }}
                />
              </Form.Group>

              <Button data-testid="login-button" variant="primary" type="submit" className="w-100 mb-3">
                Masuk
              </Button>

              <div className="text-center">
                <a href="#" className="d-block mb-2">
                  Lupa kata sandi?
                </a>
                <Link to={"/register"} className="d-block">
                  Belum punya akun? Daftar
                </Link>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default LoginPage;
