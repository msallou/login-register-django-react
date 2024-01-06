// notificationUtils.js
import axios from 'axios';

const fetchNotifications = async (user_id, setNotifications) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/notifications/${user_id}/`);
    setNotifications(response.data);
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};

const createNotification = async (user_id, first_name, setNotifications, message) => {
  try {
    // Make a POST request to create a new notification
    await axios.post('http://localhost:8000/api/create-notification/', {
      user_id: user_id,
    //   message: `${first_name} created a new notification!`,
      message: message,
    });

    // Fetch updated notifications after creating a new one
    fetchNotifications(user_id, setNotifications);
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

export { fetchNotifications, createNotification };
