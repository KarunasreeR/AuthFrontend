import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "reactstrap";

export default function Members() {
  const token = localStorage.getItem("token");
  const [login, setLogin] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (!token) {
      setLogin(false);
      console.log(token);
    } else {
      setLogin(true);
      console.log(token);
      axios
        .get(`https://authbackend-uoeq.onrender.com/users/list`, {
          headers: { token },
        })
        .then((res) => {
          console.log(res.data);
          setUsers(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        {login ? (
          <div className="col-lg-8 col-md-10">
            <div className="bg-light border rounded p-4 shadow-sm">
              <h1 className="mb-4 text-center">Users Details</h1>
              <div className="table-container">
                <div style={{ maxHeight: "400px", overflowY: "auto" }}>
                  <table className="table table-bordered table-hover">
                    <thead className="table-info">
                      <tr>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Date of Birth</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.email}>
                          <td>{user.email}</td>
                          <td>{user.name}</td>
                          <td>{user.dob}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center mt-4">Please Login</p>
        )}
      </div>
    </div>
  );
}
