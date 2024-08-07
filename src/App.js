import "./App.css";
import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Navigate,
} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Members from "./Members";
import EditUser from "./EditUser";
import Logout from "./Logout";
import "bootstrap/dist/css/bootstrap.min.css";
import ForgotPassword from "./ForgotPassword";

function App() {
  const [login, setLogin] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  }, []);
  return (
    <div
      className="d-flex flex-column align-items-stretch"
      style={{ height: "100vh" }}
    >
      <BrowserRouter>
        {login ? (
          <div className="d-flex justify-content-around p-2">
            <div className="">
              <NavLink
                activeClassName="active"
                className="p-2 links"
                to="/members"
              >
                Users
              </NavLink>
            </div>
            <div className="">
              <NavLink
                activeClassName="active"
                className="p-2 links"
                to="/edit"
              >
                Edit User
              </NavLink>
            </div>
            <div className="">
              <NavLink
                activeClassName="active"
                className="p-2 links"
                to="/logout"
              >
                logout
              </NavLink>
            </div>
          </div>
        ) : (
          <div className="d-flex justify-content-around p-2 ">
            <div className="">
              <NavLink
                activeClassName="active"
                className="p-2 links"
                to="/register"
              >
                Register
              </NavLink>
            </div>
            <div className="">
              <NavLink
                activeClassName="active"
                className="p-2 links"
                to="/login"
              >
                Login
              </NavLink>
            </div>
          </div>
        )}
        <div className="bg-primary h-100 content-wrapper">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/members" element={<Members />} />
            <Route path="/edit" element={<EditUser />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
