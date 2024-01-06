import React, { useEffect, useState } from 'react';
import useAxios from '../utils/useAxios';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { fetchNotifications, createNotification } from '../utils/notificationUtils';

function Dashboard({}) {
  const [notifications, setNotifications] = useState([]);

  const token = localStorage.getItem('authTokens');
  let user_id, first_name;

  if (token) {
    const decoded = jwtDecode(token);
    user_id = decoded.user_id;
    first_name = decoded.first_name;
  }


  // Run this useEffect React Hook anywhere and pass in the custom notification message inside the createNotification call function
  useEffect(() => {
    // Fetch notifications when the component mounts
    fetchNotifications(user_id, setNotifications);
  }, [user_id]);

  const handleCreateNotification = async () => {
    try {
      // Use the createNotification function
      await createNotification(user_id, first_name, setNotifications, `This is a custom message from ${first_name}`);
    } catch (error) {
      console.error('Error handling createNotification:', error);
    }
  };




  return (
  <div className="container-fluid" style={{ marginTop: 100 }}>
          <h5 className='h5'>Welcome, {first_name}</h5>
          <h5 className="h5">Your ID is {user_id}</h5>
          <h1 className="h2">My Dashboard</h1>
          <hr/>

          <h1>Notifications</h1>
          <button onClick={handleCreateNotification}>Create Notification</button>
            <ul>
                {notifications.map(notification => (
                    <li key={notification.id}>
                    Message: <b>{notification.message}</b> Date: <b>{new Date(notification.notified).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                    })}</b>
                  </li>
                ))}
            </ul>
  </div>
  )
}

export default Dashboard
