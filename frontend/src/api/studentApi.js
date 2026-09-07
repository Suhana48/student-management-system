import axios from "axios";

const API_URL = "http://localhost:8080/api/students";

export const getAllStudents = () => {
  return axios.get(API_URL);
};

export const createStudent = (student, departmentId) => {
  return axios.post(`${API_URL}?departmentId=${departmentId}`, student);
};

export const updateStudent = (id, student, departmentId) => {
  return axios.put(
    `${API_URL}/${id}?departmentId=${departmentId}`,
    student
  );
};

export const deleteStudent = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};