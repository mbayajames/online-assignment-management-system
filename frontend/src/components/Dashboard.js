import React from 'react';
import { useSelector } from 'react-redux';
import AssignmentList from './AssignmentList';
import AssignmentForm from './AssignmentForm';
import AddStudentForm from './AddStudentForm';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const user = useSelector(state => state.user);

  return (
    <div className="dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <h1>Welcome to the Assignment Management System</h1>
        {user.role === 'admin' && (
          <>
            <AddStudentForm />
            <AssignmentForm />
          </>
        )}
        <AssignmentList />
      </div>
    </div>
  );
};

export default Dashboard;