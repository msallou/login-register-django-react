import React, { Fragment } from 'react'
import { jwtDecode } from 'jwt-decode'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

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
          <a className="navbar-brand" href={token !== null ? "/dashboard" : "home"}>
            <img style={{width:"150px", padding:"6px"}} src="/images/logo_straight.png" alt=""/> {/*Math wizard logo*/}

          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              
              {token === null && // not logged in
              <Fragment>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page"  href="/login">Login</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page"  href="/register">Register</a>
                </li>
              </Fragment>
              }
              {token !== null && // logged in
              <Fragment>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href="/dashboard">Dashboard</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" onClick={logoutUser} style={{cursor: 'pointer'}}>Logout</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" aria-current="page" href='/settings' style={{cursor: 'pointer'}}>Settings</a>
                </li>
              </Fragment>
              }
              <li className="nav-item">
                <a className="nav-link" aria-current="page"  href="/help">Help Desk</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
