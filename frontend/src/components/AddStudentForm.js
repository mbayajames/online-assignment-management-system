import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { register } from '../utils/api';
import Notification from './Notification';

const AddStudentForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); // Default role
  const [message, setMessage] = useState('');
  const user = useSelector(state => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(user.token, { username, password, role }); // Include role
      setMessage('User added successfully!');
      // Clear form fields
      setUsername('');
      setPassword('');
      setRole('student');
    } catch (error) {
      setMessage('Failed to add user.');
    }
  };

  return (
    <div className="add-student-form">
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Username" 
          required 
        />
        <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          placeholder="Password" 
          required 
        />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="student">Student</option>
          <option value="admin">Admin</option>
          <option value="other">Other</option> {/* Additional roles can be added here */}
        </select>
        <button type="submit">Add User</button>
      </form>
      {message && <Notification message={message} />}
    </div>
  );
};

export default AddStudentForm;