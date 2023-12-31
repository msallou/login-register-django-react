import React, { useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCubes } from "@fortawesome/free-solid-svg-icons";
import "./LoginPage.css";
const swal = require('sweetalert2')


function LoginPage() {
  const { loginUser, isAuthenticated } = useContext(AuthContext);
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      history.push("/dashboard");
    }
  }, [history, isAuthenticated]);

  useEffect(() => {
    // Enable the button only if both fields are not blank
    setIsButtonDisabled(username.trim() === "" || password.trim() === "");
  }, [username, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if the username exists
    const response = await checkUsernameExists(username);
  
    if (response.exists) {
      // Username exists, proceed with login
      loginUser(username, password, handleSuccessfulLogin);
    } else {
      // Username does not exist, show an alert
      swal.fire({
        title: 'Error While Logging In',
        html: 'Username Does Not Exist',
        icon: 'error',
        toast: true,
        timer: 5001,
        position: 'top-right',
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };
  
  // Function to check if the username exists
  const checkUsernameExists = async (username) => {
    try {
      const response = await fetch(`http://localhost:8000/api/check-username-exists/${username}/`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error checking username existence:', error);
      return { exists: false };
    }
  };

  const handleSuccessfulLogin = () => {
    history.push("/dashboard");
  };

  return (
    <section className="vh-100 gradient">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card card-landing">
              <div className="row g-0">
                <div className="col-md-6 col-lg-5 d-none d-md-block">
                  <img
                    src="https://c8.alamy.com/comp/D9N2MX/protractor-on-the-background-of-mathematical-formulas-and-algorithms-D9N2MX.jpg"
                    alt="login form"
                    className="img-fluid"
                  />
                </div>
                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                  <div className="card-body p-4 p-lg-5 text-black">
                    <form onSubmit={handleSubmit}>
                      <div className="d-flex align-items-center mb-3 pb-1">
                        <FontAwesomeIcon icon={faCubes} className="icon" />
                        <span className="h2 fw-bold mb-0">Welcome back</span>
                      </div>
                      <h5 className="fw-normal mb-3 pb-3">Sign into your account</h5>
                      <div className="form-outline mb-4">
                        <input
                          type="text"
                          id="form2Example17"
                          className="form-control form-control-lg"
                          name="username"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                        <label className="form-label" htmlFor="form2Example17">
                          Username
                        </label>
                      </div>
                      <div className="form-outline mb-4">
                        <input
                          type="password"
                          id="form2Example27"
                          className="form-control form-control-lg"
                          name="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label className="form-label" htmlFor="form2Example27">
                          Password
                        </label>
                      </div>
                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-dark btn-lg btn-block"
                          type="submit"
                          disabled={isButtonDisabled}
                        >
                          Login
                        </button>
                      </div>
                      <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                        Don't have an account?{" "}
                        <a href="/register" style={{ color: "#393f81" }}>
                          Register here
                        </a>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginPage;
