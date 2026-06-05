import axios from 'axios';

// Base URL for backend Spring Boot API
const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Course CRUD Operations
export const getCourses = async () => {
  const response = await api.get('/courses');
  return response.data;
};

export const createCourse = async (courseData) => {
  const response = await api.post('/courses', courseData);
  return response.data;
};

export const updateCourse = async (id, courseData) => {
  const response = await api.put(`/courses/${id}`, courseData);
  return response.data;
};

export const deleteCourse = async (id) => {
  await api.delete(`/courses/${id}`);
  return true;
};

// Enrollment Operations
export const getEnrollments = async () => {
  const response = await api.get('/enrollments');
  return response.data;
};

export const enrollStudent = async (courseId, studentName) => {
  const response = await api.post('/enrollments', { courseId, studentName });
  return response.data;
};

export const deleteEnrollment = async (enrollmentId) => {
  await api.delete(`/enrollments/${enrollmentId}`);
  return true;
};
