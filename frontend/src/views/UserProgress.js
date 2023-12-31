import React, {useState, useEffect} from 'react'
import './assigmentTable.css'
import { jwtDecode } from 'jwt-decode';
import { createAssignment, fetchAssignments } from '../utils/progressUtils';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import './Progress.css'



const UserProgress = () => {
  const [assignment, setAssignment] = useState([]);
  const token = localStorage.getItem('authTokens');
  let user_id, first_name, last_name;

  if (token) {
    const decoded = jwtDecode(token);
    user_id = decoded.user_id;
    first_name = decoded.first_name;
    last_name = decoded.last_name;
  }

  // Run this useEffect React Hook anywhere and pass in the custom notification message inside the createNotification call function
  useEffect(() => {
    // Fetch notifications when the component mounts
    fetchAssignments(user_id, setAssignment);
  }, [user_id]);

  const handleCreateAssignmentReport = async () => {
    try {
        // Use the createAssignment function
        // user_id, date, grade, unit, lesson, setAssignment
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('en-US', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        });

        await createAssignment(user_id, formattedDate, 5, 4, 3, 67.50, "Completed", setAssignment);
    } catch (error) {
        console.error('Error handling createNotification:', error);
    }
  };

  // User cannot open file explorer for security reasons
  // PDF
  const handleGeneratePDF = () => {
    // Prompt the user for the file name
    const fileName = window.prompt('Enter file name (.pdf is automatically added):', `${first_name}_assignment_report`);
  
    // Check if the user entered a file name
    if (fileName !== null && fileName.trim() !== '') {
      const doc = new jsPDF();
  
      // Add title to the PDF
      doc.text(`Math Wizard Assignment Report for ${first_name} ${last_name}`, 14, 10);
  
      // Add the assignment table
      doc.autoTable({
        head: [['Date', 'Grade', 'Unit', 'Lesson', 'Status', 'Score']],
        body: assignment.map((a) => [a.date, a.grade, a.unit, a.lesson, a.completedStatus, a.score]),
      });
  
      // Save the PDF with the entered file name
      doc.save(`${fileName}.pdf`);
    } else {
      // Handle the case where the user canceled or entered an empty file name
      alert('Invalid file name. Please try again.');
    }
  };

  return (
    <div className="container-fluid" style={{ marginTop: 100 }}>
      <h1 className="h1">Welcome, {first_name}</h1>
      <h3 className="h3">This is your assignment history page</h3>
      <button id="generate-pdf-btn" onClick={handleGeneratePDF}>Generate PDF</button>
      <button id="create-assignment-btn" onClick={handleCreateAssignmentReport}>Create Assignment</button>

      <h2>Assignment Table</h2>
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
                    {assignment.map(assignment => (
                        <tr key={assignment.id}>
                            <td>{assignment.date}</td>
                            <td>{assignment.grade}</td>
                            <td>{assignment.unit}</td>
                            <td>{assignment.lesson}</td>
                            <td>{assignment.completedStatus}</td>
                            <td>{assignment.score}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
  )
}

export default UserProgress