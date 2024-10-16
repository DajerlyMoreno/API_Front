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
