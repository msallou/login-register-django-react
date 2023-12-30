import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
const swal = require('sweetalert2')


function Navbar() {
  const {user, logoutUser} = useContext(AuthContext)
  const token = localStorage.getItem('authTokens')

  if (token) { // a token exists, meaning logged in
    const decoded = jwtDecode(token)
    var user_id = decoded.user_id
  }


  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/home">
            <img style={{ width: "50px", padding: "6px" }} src="/images/logo192.png" alt="" /> {/*Math wizard logo*/}
          </NavLink>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {token === null && // not logged in
                <Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login" activeClassName="active" aria-current="page">Login</NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/register" activeClassName="active" aria-current="page">Register</NavLink>
                  </li>
                </Fragment>
              }
              {token !== null && // logged in
                <Fragment>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/dashboard" activeClassName="active" aria-current="page">Dashboard</NavLink>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" onClick={logoutUser} style={{ cursor: 'pointer' }}>Logout</a>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/settings" activeClassName="active" style={{ cursor: 'pointer' }}>Settings</NavLink>
                  </li>
                </Fragment>
              }
              <li className="nav-item">
                <NavLink className="nav-link" to="/help" activeClassName="active" aria-current="page">Help Desk</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
