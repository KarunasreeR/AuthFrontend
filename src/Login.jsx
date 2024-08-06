/* eslint-disable import/no-extraneous-dependencies */
import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

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
          window.location.pathname = "/members";
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="fluid-container border w-50 border-primary w-25 mx-auto mt-3 p-3">
      <h1>Login Here</h1>
      <p className="error">{error}</p>
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
        <button
          type="submit"
          className="btn btn-primary btn-lg m-2 mx-auto w-100"
        >
          Login
        </button>
      </form>
      <div>
        <NavLink
          activeClassName="active"
          className="links"
          to="/forgotpassword"
        >
          <button
            type="button"
            className="btn btn-secondary btn-lg m-2 mx-auto w-100"
          >
            Forgot Password
          </button>
        </NavLink>
      </div>
      <p className="msg">{msg}</p>
    </div>
  );
}
