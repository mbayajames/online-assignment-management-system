import React, { useState } from 'react';
import { createAssignment } from '../utils/api';
import { useSelector } from 'react-redux';

const AssignmentForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const user = useSelector(state => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createAssignment(user.token, { title, description, dueDate, assignedTo: user.id });
      alert("Assignment created successfully!");
      // Clear form fields
      setTitle('');
      setDescription('');
      setDueDate('');
    } catch (error) {
      console.error("Failed to create assignment", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Assignment</h2>
      <input 
        type="text" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        placeholder="Assignment Title" 
        required 
      />
      <textarea 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        placeholder="Assignment Description" 
        required 
      />
      <input 
        type="date" 
        value={dueDate} 
        onChange={(e) => setDueDate(e.target.value)} 
        required 
      />
      <button type="submit">Create Assignment</button>
    </form>
  );
};

export default AssignmentForm;