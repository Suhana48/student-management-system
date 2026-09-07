import axios from "axios";

const API_URL = "http://localhost:8080/api/students";

export const getAllStudents = () => {
  return axios.get(API_URL);
};

export const createStudent = (student, departmentId) => {
  return axios.post(`${API_URL}?departmentId=${departmentId}`, student);
};