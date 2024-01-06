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

  useEffect(() => {
    const fetchNotifications = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/notifications/${user_id}/`);
            setNotifications(response.data);
        } catch (error) {
            console.error('Error fetching notifications:', error);
        }
    };

    fetchNotifications();
}, [user_id]);



  return (
  <div className="container-fluid" style={{ marginTop: 100 }}>
          <h5 className='h5'>Welcome, {first_name}</h5>
          <h5 className="h5">Your ID is {user_id}</h5>
          <h1 className="h2">My Dashboard</h1>
          <hr/>

          <h1>Notifications</h1>
            <ul>
                {notifications.map(notification => (
                    <li key={notification.id}>{notification.message}</li>
                ))}
            </ul>
  </div>
  )
}

export default Dashboard
