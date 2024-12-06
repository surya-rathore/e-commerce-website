import React, { useState } from "react";
import { Footer, Navbar } from "../components";
import { Link } from "react-router-dom";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [userdata, setUserdata] = useState({
    name: "",
    email: "",
    password: "",
    conpassword: "",
  });

  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserdata({
      ...userdata,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5500/user", userdata, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        setSuccessMessage(response.data.message || "User registered successfully!");
        setErrorMessage(null);

        // Redirect to login page
        if (response.data.redirect) {
          navigate(response.data.redirect);
        }
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response?.data?.message || "An error occurred during registration.");
      setSuccessMessage(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Register</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="form my-3">
                <label htmlFor="Name">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  id="Name"
                  placeholder="Enter Your Name"
                  value={userdata.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="Email">Email Address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  id="Email"
                  placeholder="name@example.com"
                  value={userdata.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  id="Password"
                  placeholder="Password"
                  value={userdata.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form my-3">
                <label htmlFor="ConPassword">Confirm Password</label>
                <input
                  type="password"
                  name="conpassword"
                  className="form-control"
                  id="ConPassword"
                  placeholder="Confirm Password"
                  value={userdata.conpassword}
                  onChange={handleChange}
                  required
                />
              </div>
              {errorMessage && (
                <div className="text-danger text-center">{errorMessage}</div>
              )}
              {successMessage && (
                <div className="text-success text-center">{successMessage}</div>
              )}
              <div className="my-3">
                <p>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-decoration-underline text-info"
                  >
                    Login
                  </Link>
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
