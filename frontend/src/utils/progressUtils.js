import axios from 'axios';

const fetchAssignments = async (user_id, setAssignment) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/assignments/${user_id}/`);
    setAssignment(response.data);
  } catch (error) {
    console.error('Error fetching assignments:', error);
  }
};

const createAssignment = async (user_id, date, grade, unit, lesson, setAssignment) => {
  try {
    // Make a POST request to create a new notification
    await axios.post('http://localhost:8000/api/create-assignment-report/', {
      user_id: user_id,
    //   message: `${first_name} created a new notification!`,
      date: date,
      grade: grade,
      unit: unit,
      lesson: lesson
    });

    // Fetch updated notifications after creating a new one
    fetchAssignments(user_id, setAssignment);
  } catch (error) {
    console.error('Error creating assignment report:', error);
  }
};

export { fetchAssignments, createAssignment };
