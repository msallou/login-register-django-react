import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
const swal = require('sweetalert2')

function Settings() {
  const { user, setUser, authTokens } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  useEffect(() => {
    // Set the initial form data when the component mounts
    if (user) {
      setFormData({
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.put(
        'http://127.0.0.1:8000/api/profile/',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens?.access}`,
          },
        }
      );
      
  
      if (response.status === 200) {
        setUser({
          ...user,
          ...formData,
        });
        swal.fire({
          title: "Successfully Updated Profile",
          icon: "success",
          toast: true,
          timer: 5000,
          position: 'top-right',
          timerProgressBar: true,
          showConfirmButton: false,
        });
      } else {
        console.error('Failed to update profile:', response);
        alert('Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('An error occurred during the update:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container-fluid" style={{ marginTop: 100 }}>
      <h1 className="h2">Settings</h1>
      <hr />
      <h1 className="h4">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">
            First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="last_name" className="form-label">
            Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Settings;