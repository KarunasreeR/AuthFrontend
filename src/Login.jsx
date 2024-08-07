/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Card, Col, Row } from "reactstrap";

export default function Login() {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const getUser = (event) => {
    event.preventDefault();
    const user = {
      email: event.target.email.value,
      password: event.target.password.value,
    };
    axios
      .post("https://authbackend-uoeq.onrender.com/users/login/", user)
      .then((res) => {
        if (res.data.status === 0) {
          setError(res.data.data);
          setMsg("");
        } else {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", event.target.email.value);
          setMsg("login success");
          setError("");
          window.location.pathname = "/users";
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-center h-100">
      <div className="min-w-50 w-sm-75 w-md-50">
        <Card body>
          <h1>Login</h1>
          <form onSubmit={getUser}>
            <div className="form-label">
              <b>Enter Email:</b>
            </div>
            <input
              type="email"
              placeholder="Email"
              name="email"
              required
              className="w-100 p-2 mb-2"
            />
            <br />
            <div className="form-label">
              <b>Enter Password:</b>
            </div>
            <input
              type="password"
              placeholder="password"
              name="password"
              required
              className="w-100 p-2 mb-2"
            />
            <br />
            <p className="text-danger text-start">{error}</p>
            <div className="d-flex justify-content-end">
              <NavLink
                activeClassName="active w-25"
                className="links"
                to="/forgotpassword"
              >
                {" "}
                <p className="text-end">Forgot Password</p>
              </NavLink>
            </div>
            <button type="submit" className="login-btn p-2 mx-auto w-100">
              Login
            </button>
          </form>
          <p className="text-success text-center">{msg}</p>
        </Card>
      </div>
    </div>
  );
}
