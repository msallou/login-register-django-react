// RegisterPage.js

import React, { useState, useContext, useEffect } from 'react';
import AuthContext from "../context/AuthContext";
import { useHistory } from 'react-router-dom';
import "./RegisterPage.css";

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [first_name, setFirst_Name] = useState('');
  const [last_name, setLast_Name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const { registerUser, authTokens } = useContext(AuthContext);
  const history = useHistory();

  useEffect(() => {
    if (authTokens) {
      history.push('/dashboard')
    }
  }, [authTokens, history])

  const handleSubmit = async (e) => {
    e.preventDefault();
    registerUser(
      username,
      first_name,
      last_name,
      email,
      password,
      password2,
      handleSuccessfulRegistration
    );
  };

  const handleSuccessfulRegistration = () => {
    history.push("/login");
  };

  return (
    <div>
      <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100" style={{ marginTop: '50px' }}>
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
                      <div className="card-body p-4 p-lg-5 text-black form-container">
                      <form onSubmit={handleSubmit}>
                        <div className="d-flex align-items-center mb-3 pb-1">
                          <i className="fas fa-cubes fa-2x me-3 icon" />
                          <span className="h2 fw-bold mt-4">Welcome to <b>Math Wizard</b></span>
                        </div>
                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: 1 }}>Sign Up</h5>
                        <div className="form-outline mb-2">
                          <input type="text" id="formUsername" className="form-control form-control-lg" placeholder="Username" onChange={e => setUsername(e.target.value)} />
                          <label className="form-label" htmlFor="formUsername">Username</label>
                        </div>
                        <div className="form-outline mb-2">
                          <input type="text" id="formFirstName" className="form-control form-control-lg" placeholder="First Name" onChange={e => setFirst_Name(e.target.value)} />
                          <label className="form-label" htmlFor="formFirstName">First Name</label>
                        </div>
                        <div className="form-outline mb-2">
                          <input type="text" id="formLastName" className="form-control form-control-lg" placeholder="Last Name" onChange={e => setLast_Name(e.target.value)} />
                          <label className="form-label" htmlFor="formLastName">Last Name</label>
                        </div>
                        <div className="form-outline mb-2">
                          <input type="email" id="formEmail" className="form-control form-control-lg" placeholder="Email Address" onChange={e => setEmail(e.target.value)} />
                          <label className="form-label" htmlFor="formEmail">Email Address</label>
                        </div>
                        <div className="form-outline mb-2">
                          <input type="password" id="formPassword" className="form-control form-control-lg" placeholder="Password" onChange={e => setPassword(e.target.value)} />
                          <label className="form-label" htmlFor="formPassword">Password</label>
                        </div>
                        <div className="form-outline mb-2">
                          <input type="password" id="formConfirmPassword" className="form-control form-control-lg" placeholder="Confirm Password" onChange={e => setPassword2(e.target.value)} />
                          <label className="form-label" htmlFor="formConfirmPassword">Confirm Password</label>
                        </div>
                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="submit">Register</button>
                        </div>
                        <p className="pb-lg-2 small text-muted">Already have an account? <a href="/login">Login here</a></p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default RegisterPage;
