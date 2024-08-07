import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink } from "react-router-dom";
import { Card } from "reactstrap";

export default function Register() {
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const addUser = (event) => {
    event.preventDefault();
    const user = {
      name: event.target.name.value,
      password: event.target.password.value,
      email: event.target.email.value,
      dob: event.target.dob.value,
    };
    axios
      .post("https://authbackend-uoeq.onrender.com/users/", user)
      .then((res) => {
        if (res.data.status === 0) {
          setError(res.data.data);
          setMsg("");
        } else {
          setMsg(res.data.data + ". Please Login");
          setError("");
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
          <h1>Register Here</h1>
          <form onSubmit={addUser}>
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
              <b>Enter Username:</b>
            </div>
            <input
              type="text"
              placeholder="Username"
              name="name"
              required
              className="w-100 p-2 mb-2"
            />
            <br />
            <div className="form-label ">
              <b>Enter Password:</b>
            </div>
            <input
              type="password"
              placeholder="Password"
              name="password"
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
              Register
            </button>
          </form>

          <p className="text-success p-2 text-center">{msg}</p>
        </Card>
      </div>
    </div>
  );
}
