/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import axios from "axios";
import { Card } from "reactstrap";

export default function ForgotPassword() {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const submitDetails = (event) => {
    event.preventDefault();
    const user = {
      email: event.target.email.value,
      dob: event.target.dob.value,
    };
    axios
      .post("https://authbackend-uoeq.onrender.com/users/forgotPassword/", user)
      .then((res) => {
        if (res.data.status === 0) {
          setError(res.data.data);
          setMsg("");
        } else {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("user", event.target.email.value);
          setMsg("verification success");
          setError("");
          window.location.pathname = "/edit";
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
          <h1>Forgot password</h1>
          <p className="error">{error}</p>
          <form onSubmit={submitDetails}>
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
              <b>Enter Date of Birth:</b>
            </div>
            <input
              type="date"
              placeholder="dob"
              name="dob"
              required
              className="w-100 p-2 mb-2"
            />
            <br />
            <button type="submit" className="login-btn p-2 mt-4 mx-auto w-100">
              Submit
            </button>
          </form>
          <p className="text-success text-center mt-2">{msg}</p>
        </Card>
      </div>
    </div>
  );
}
