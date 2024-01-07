import React, { useState, useEffect } from 'react';
import './assigmentTable.css';
import { jwtDecode } from 'jwt-decode';
import { createAssignment, fetchAssignments, setAssignment } from '../utils/progressUtils';

const UserProgress = () => {
  const [assignment, setAssignmentData] = useState([]);
  const [selectedRange, setSelectedRange] = useState('all'); // Default to show all assignments

  const token = localStorage.getItem('authTokens');
  let user_id, first_name;

  if (token) {
    const decoded = jwtDecode(token);
    user_id = decoded.user_id;
    first_name = decoded.first_name;
  }

  useEffect(() => {
    fetchAssignments(user_id, setAssignmentData);
  }, [user_id]);

  const handleCreateAssignmentReport = async () => {
    try {
      const currentDate = new Date();
      const formattedDate = currentDate.toLocaleString('en-US', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      });

      await createAssignment(user_id, formattedDate, 5, 4, 3, 67.50, 'Completed', setAssignmentData);
    } catch (error) {
      console.error('Error handling createNotification:', error);
    }
  };

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
  };

  // Filter assignments based on the selected time range
  const filteredAssignments = assignment.filter((assignmentItem) => {
    const assignmentDate = new Date(assignmentItem.date);
    const currentDate = new Date();
  
    // Logic to filter based on selected time range
    if (selectedRange === 'last7days') {
      const sevenDaysAgo = new Date(currentDate);
      sevenDaysAgo.setDate(currentDate.getDate() - 7);
      return assignmentDate >= sevenDaysAgo;
    } else if (selectedRange === 'last30days') {
      const thirtyDaysAgo = new Date(currentDate);
      thirtyDaysAgo.setDate(currentDate.getDate() - 30);
      return assignmentDate >= thirtyDaysAgo;
    } else if (selectedRange === 'last2minutes') {
      const twoMinutesAgo = new Date(currentDate);
      twoMinutesAgo.setMinutes(currentDate.getMinutes() - 2);
      return assignmentDate >= twoMinutesAgo;
    }
  
    return true; // 'all' or unknown range, show all assignments
  });

  return (
    <div className="container-fluid" style={{ marginTop: 100 }}>
      <h1 className="h1">Welcome, {first_name}</h1>
      <h3 className="h3">This is your assignment history page</h3>
      <button onClick={handleCreateAssignmentReport}>Create Assignment</button>
      <h2>Assignment Table</h2>

      {/* Dropdown for selecting time range */}
      <label htmlFor="timeRange">Select Time Range: </label>
      <select id="timeRange" value={selectedRange} onChange={handleRangeChange}>
        <option value="all">All</option>
        <option value="last7days">Last 7 Days</option>
        <option value="last30days">Last 30 Days</option>
        <option value="last2minutes">Last 2 Minutes</option>
      </select>

      <div className="table-container">
        <table className="assignment-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Grade</th>
              <th>Unit</th>
              <th>Lesson</th>
              <th>Status</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssignments.map((assignmentItem) => (
              <tr key={assignmentItem.id}>
                <td>{assignmentItem.date}</td>
                <td>{assignmentItem.grade}</td>
                <td>{assignmentItem.unit}</td>
                <td>{assignmentItem.lesson}</td>
                <td>{assignmentItem.completedStatus}</td>
                <td>{assignmentItem.score}/100</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserProgress;
