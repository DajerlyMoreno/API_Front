import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const getEmployees = async () => {
  return await axios.get(`${API_URL}/employees`);
};

export const getEmployeeById = async (id) => {
  return await axios.get(`${API_URL}/employees/${id}`);
};

export const createEmployee = async (employeeData) => {
  return await axios.post(`${API_URL}/employees`, employeeData);
};

export const updateEmployee = async (employeeData) => {
  return await axios.put(`${API_URL}/employees`, employeeData);
};

export const getDepartments = async () => {
  return await axios.get(`${API_URL}/departments`);
};

export const getDepartmentById = async (id) => {
  return await axios.get(`${API_URL}/departments/${id}`);
};

export const createDepartment = async (departmentData) => {
  return await axios.post(`${API_URL}/departments`, departmentData);
};
