import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import axios from "axios";

import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [userdata, setUserdata] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdata({
      ...userdata,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5500/user/login", userdata, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSuccessMessage(response.data.message || "User login successful!");
        setErrorMessage(null);

        if (response.data.redirect) {
          navigate(response.data.redirect);
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "Login failed.");
      setSuccessMessage(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="floatingInput">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  value={userdata.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-3">
                <label htmlFor="floatingPassword">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  value={userdata.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="my-3">
                <p>
                  New Here?{" "}
                  <Link to="/register" className="text-decoration-underline text-info">
                    Register
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
            {errorMessage && <div className="text-danger text-center">{errorMessage}</div>}
            {successMessage && <div className="text-success text-center">{successMessage}</div>}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
