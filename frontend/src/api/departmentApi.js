import axios from "axios";

const API_URL = "https://student-management-system-j621.onrender.com/api/departments";

export const getAllDepartments = () => {
  return axios.get(API_URL);
};

export const createDepartment = (department) => {
  return axios.post(API_URL, department);
};

export const updateDepartment = (id, department) => {
  return axios.put(`${API_URL}/${id}`, department);
};

export const deleteDepartment = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};