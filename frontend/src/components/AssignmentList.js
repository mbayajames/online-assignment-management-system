import React, { useEffect, useState } from 'react';
import { fetchAssignments, submitAssignment, gradeSubmission } from '../utils/api';
import { useSelector } from 'react-redux';

const AssignmentList = () => {
  const user = useSelector(state => state.user);
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const getAssignments = async () => {
      try {
        const response = await fetchAssignments(user.token);
        setAssignments(response.data);
      } catch (error) {
        console.error("Failed to fetch assignments", error);
      }
    };
    getAssignments();
  }, [user.token]);

  const handleSubmit = async (assignmentId) => {
    try {
      await submitAssignment(user.token, assignmentId, user.id);
      alert("Submission successful! Your current status is: Pending");
    } catch (error) {
      console.error("Failed to submit assignment", error);
    }
  };

  const handleGrade = async (assignmentId, userId) => {
    const grade = prompt("Enter grade:");
    const feedback = prompt("Enter feedback:");

    try {
      await gradeSubmission(user.token, assignmentId, userId, { grade, feedback });
      alert("Submission graded successfully!");
    } catch (error) {
      console.error("Failed to grade submission", error);
    }
  };

  return (
    <div className="assignment-list">
      <h2>Your Assignments</h2>
      <ul>
        {assignments.map((assignment) => (
          <li key={assignment._id}>
            <h3>{assignment.title}</h3>
            <p>{assignment.description}</p>
            <p>Due Date: {new Date(assignment.dueDate).toLocaleDateString()}</p>
            {user.role === 'student' && 
              !assignment.submissions.some(sub => sub.userId === user.id) && (
                <button onClick={() => handleSubmit(assignment._id)}>Submit Assignment</button>
            )}
            {user.role === 'admin' && (
              assignment.submissions.map(submission => (
                <div key={submission.userId}>
                  <p>Submitted by: {submission.userId}</p>
                  <button onClick={() => handleGrade(assignment._id, submission.userId)}>Grade Submission</button>
                </div>
              ))
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssignmentList;