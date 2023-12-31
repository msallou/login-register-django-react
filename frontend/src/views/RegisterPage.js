// RegisterPage.js

import React, { useState, useContext, useEffect } from 'react';
import AuthContext from "../context/AuthContext";
import { useHistory } from 'react-router-dom';
import "./RegisterPage.css";
import { Button } from 'reactstrap'
import axios from 'axios'



function RegisterPage() {
  const [requirementsShow, setrequirementsShow] = useState('none')
  const [confirmHide, setConfirmHide] = useState(true)
  const [usernameErrorMessage, setUsernameErrorMessage] = useState('')
  const [usernameAvailable, setUsernameAvailable] = useState(true)
  const [invalidFields, setInvalidFields] = useState()


  const [passMatchStyle, setpassMatchStyle] = useState('none')
  const [isEntirelyNumeric, setIsEntirelyNumeric] = useState('');
  const [numericColor, setNumericColor] = useState('black');
  const [lengthColor, setLengthColor] = useState('black');
  const [personalInfoColor, setPersonalInfoColor] = useState('black');
  const [commonPasswordColor, setCommonPasswordColor] = useState('black');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const [emailErrorMessage, setEmailErrorMessage] = useState('');

  const [username, setUsername] = useState('');
  const [first_name, setFirst_Name] = useState('');
  const [last_name, setLast_Name] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const { registerUser, authTokens } = useContext(AuthContext);
  const history = useHistory();


  const fetchCommonPasswords = async () => {
    try {
      const response = await fetch('./commonPass.txt');
      const passwords = await response.text();
      return passwords.split('\n');
    } catch (error) {
      console.error('Error fetching common passwords:', error);
      return [];
    }
  };  

  const checkCommonPassword = async () => {
    if (password === '') {
      setCommonPasswordColor('black');
      return;
    }
  
    const commonPasswords = await fetchCommonPasswords();
    const isCommonPassword = commonPasswords.includes(password.toLowerCase());
    const hasNumber = /\d/.test(password);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
    if (isCommonPassword || !hasNumber || !hasSymbol) {
      setCommonPasswordColor('red');
    } else {
      setCommonPasswordColor('green');
    }
  };

  const checkEmail = () => {
    const emailValue = email;
  
    if (emailValue.length === 0) {
      setEmailErrorMessage('');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!emailRegex.test(emailValue)) {
        setEmailErrorMessage('Invalid Email');
      } else {
        setEmailErrorMessage('');
      }
    }
  };
  
  const checkUsernameAvailability = async () => {
    if (username === '') {
      // can't set it to available because you can then submit with a blank username
    } else{
        try {
          const response = await axios.get(`http://localhost:8000/api/check-username/${username}/`);
          const { isAvailable } = response.data;

          setUsernameAvailable(isAvailable);
        } catch (error) {
          console.error('Error checking username availability:', error);
          // setUsernameAvailable(true);  // Set to false in case of an error
          setUsernameErrorMessage('Error checking username availability');
        }
      }
  };

  const validateEntries = () => {
    if ((username !== '' && first_name !== '' && last_name !== '' && email !== '' && password !== '' && password2 !== '') && 
    (!usernameAvailable || emailErrorMessage || passMatchStyle === 'block' || lengthColor === 'red' || numericColor === 'red' || personalInfoColor === 'red' || commonPasswordColor === 'red')) {
      setInvalidFields(true)
    } else {
      setInvalidFields(false)
    }
  }
  

  const checkPersonalInfo = () => {
    if (password === '') {
      setPersonalInfoColor('black');
    } else {
      const stringsToCheck = [username, first_name, last_name];
      const lowercasePassword = password.toLowerCase();
      // const lowercasePassword2 = password2.toLowerCase();

      const filteredStrings = stringsToCheck.map(str => str.length >= 3 ? str : null).filter(Boolean); // strings that are at least three

      let matches = false

      for (const str of filteredStrings) {
        if (lowercasePassword.includes(str.toLowerCase().slice(0, 3))) {
          matches = true
        }
      }

      setPersonalInfoColor(matches? 'red' : 'green');
    }
  };


  const checkPasswordLength = () => {
    if (password === '') {
      setLengthColor('black'); // Set color to black if it's blank
      setrequirementsShow('none')
      setConfirmHide(true)
    } else {
      setLengthColor(password.length < 8 ? 'red' : 'green');
      setrequirementsShow('block')
      if (password.length < 8) {
        setConfirmHide(true)
        
      } else {
        setConfirmHide(false)
      }
    }
  };

  const checkPassMatch = () => {
    // console.log(password, password2)
    if (password !== password2) {
      setpassMatchStyle('block')
    } else {
      setpassMatchStyle('none')
    }
  }

  const checkNumericPassword = () => {
    if (password === '') {
      setNumericColor('black'); // Set color to black if it's blank
      setIsEntirelyNumeric(false);
    } else {
      const numericRegex = /^[0-9]+$/;
      const isNumeric = password.match(numericRegex) !== null;
      setIsEntirelyNumeric(isNumeric);
      setNumericColor(isNumeric ? 'red' : 'green');
    }
  };

  useEffect(() => {
    const body = document.body;
    body.style.overflow = 'hidden';

    checkPassMatch();
    checkPasswordLength();
    checkNumericPassword();
    checkPersonalInfo();
    checkCommonPassword();
    checkEmail()
    checkUsernameAvailability()
    validateEntries()
  
    const passlength = document.getElementById('passlength');
    const match = document.getElementById('match');
    const entirelynumeric = document.getElementById('entirelynumeric');
    const personalinfo = document.getElementById('personalinfo');
    const toocommon = document.getElementById('toocommon');
  
    passlength.style.color = lengthColor;
    match.style.display = passMatchStyle;
    entirelynumeric.style.color = numericColor;
    personalinfo.style.color = personalInfoColor;
    toocommon.style.color = commonPasswordColor;

    if (
      !usernameAvailable ||
      emailErrorMessage ||
      passMatchStyle === 'block' ||
      lengthColor === 'red' ||
      numericColor === 'red' ||
      personalInfoColor === 'red' ||
      commonPasswordColor === 'red' ||
      username === '' ||
      first_name === '' ||
      last_name === '' ||
      email === '' ||
      password === '' ||
      password2 === ''
    ) {
      setIsButtonDisabled(true);
    } else {
      setIsButtonDisabled(false);
    }
  
    if (authTokens) {
      history.push('/dashboard');
    }
  }, [authTokens, history, lengthColor, password, password2, passMatchStyle, isEntirelyNumeric, numericColor, personalInfoColor, commonPasswordColor, usernameAvailable]);
  


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
                          <label className="form-label" htmlFor="formUsername">Username</label>
                          {usernameAvailable ? null : <p style={{ color: 'red' }}>✘ Username Already Exists</p>}
                          <input type="text" id="formUsername" className="form-control form-control-lg" placeholder="Username" onKeyUp={checkUsernameAvailability} onChange={(e) => {e.persist();setUsername(e.target.value);}} />
                        </div>
                        <div className="form-outline mb-2">
                          <label className="form-label" htmlFor="formFirstName">First Name</label>
                          <input type="text" id="formFirstName" className="form-control form-control-lg" placeholder="First Name" onChange={e => setFirst_Name(e.target.value)} />
                        </div>
                        <div className="form-outline mb-2">
                          <label className="form-label" htmlFor="formLastName">Last Name</label>
                          <input type="text" id="formLastName" className="form-control form-control-lg" placeholder="Last Name" onChange={e => setLast_Name(e.target.value)} />
                        </div>
                        <div className="form-outline mb-2">
                          <label className="form-label" htmlFor="formEmail">Email Address</label>
                          {emailErrorMessage && (<p style={{ color: 'red'}}>✘ {emailErrorMessage}</p>)}
                          <input type="email" id="formEmail" className="form-control form-control-lg" placeholder="Email Address" onKeyUp={checkEmail} onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div className="form-outline mb-2">
                          <label className="form-label" htmlFor="formPassword">Password</label>
                          <input type="password" id="formPassword" className="form-control form-control-lg" placeholder="Password" onChange={(e) => {e.persist();setPassword(e.target.value);}} />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="formConfirmPassword">Confirm Password</label>
                          <input type="password" id="formConfirmPassword" className="form-control form-control-lg" disabled={confirmHide} placeholder="Confirm Password" onChange={(e) => {setPassword2(e.target.value)}} />
                        </div>
                        <div className='requirements' style={{display: requirementsShow}}>
                          <p id="match" style={{ color: 'red', display: passMatchStyle }}><b>✘ Passwords don't match</b></p>
                          <p id='passlength'>{lengthColor === 'green' ? '✔' : '✘'} Password must be at least 8 characters</p>
                          <p id='entirelynumeric'>{numericColor === 'green' ? '✔' : '✘'} Can't be entirely numeric</p>
                          <p id='toocommon'>{commonPasswordColor === 'green' ? '✔' : '✘'} Can't be too common (at least 1 number and special character)</p>
                          <p id='personalinfo'>{personalInfoColor === 'green' ? '✔' : '✘'} Can't have any personal information</p>
                        </div>
                        <div className="pt-1 mb-4">
                        <label style={{color: 'red'}}>{invalidFields?<b>Review and validate all entries for accuracy and completeness</b>:''}</label>
                        <button className="btn btn-dark btn-lg btn-block button" disabled={isButtonDisabled} title="check all fields" type="submit">Register</button>
                        

                          <p className="pb-lg-2 small text-muted logintext" style={{textDecoration: 'none'}}>Already have an account? <a href="/login">Login here</a></p>
                        </div>
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
