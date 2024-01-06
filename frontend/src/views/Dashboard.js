import React, { useEffect, useState } from 'react'
import useAxios from '../utils/useAxios'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'

function Dashboard({}) {
  const [notifications, setNotifications] = useState([]);

  const [res, setResponse] = useState('') // data
  const api = useAxios()

  const token = localStorage.getItem('authTokens')
  if (token) { // user exists
    const decoded = jwtDecode(token)
    var user_id = decoded.user_id
    var first_name = decoded.first_name
  }

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/notifications/${user_id}/`);
      setNotifications(response.data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [user_id]);

  const handleCreateNotification = async () => {
    try {
      // Make a POST request to create a new notification
      await axios.post('http://localhost:8000/api/create-notification/', {
        user_id: user_id,
        message: `${first_name} created a new notification!`,
      });
  
      // Fetch updated notifications after creating a new one
      fetchNotifications();
    } catch (error) {
      console.error('Error creating notification:', error);
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
