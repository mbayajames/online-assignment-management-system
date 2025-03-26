import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Fixed typo from 'baseUrl' to 'baseURL'
});

export const login = (credentials) => api.post('/auth/login', credentials);

export const register = (token, user) => 
  api.post('/auth/register-student', user, { 
    headers: { Authorization: `Bearer ${token}` } 
  });

export const fetchAssignments = (token) => 
  api.get('/assignments', { 
    headers: { Authorization: `Bearer ${token}` } 
  });

export const createAssignment = (token, assignment) => 
  api.post('/assignments', assignment, {  // Fixed method from 'get' to 'post'
    headers: { Authorization: `Bearer ${token}` } // Fixed typo 'Beare' -> 'Bearer'
  });

export const markAsCompleted = (token, assignmentId) =>  // Fixed incorrect syntax
  api.patch(`/assignments/${assignmentId}/complete`, {}, { 
    headers: { Authorization: `Bearer ${token}` } 
  });

export const cancelAssignment = (token, assignmentId) => 
  api.patch(`/assignments/${assignmentId}/cancel`, {}, { 
    headers: { Authorization: `Bearer ${token}` } 
  });

export const submitAssignment = (token, assignmentId, userId) => 
  api.patch(`/assignments/${assignmentId}/submit`, { userId }, { 
    headers: { Authorization: `Bearer ${token}` } 
  });

export const gradeSubmission = (token, assignmentId, userId, data) => 
  api.patch(`/assignments/${assignmentId}/grade/${userId}`, data, { 
    headers: { Authorization: `Bearer ${token}` } 
  });
