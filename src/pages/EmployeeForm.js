import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Importación de useNavigate
import axios from 'axios';

const EmployeeForm = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    salary: '',
    department: ''
  });
  const { id } = useParams();
  const navigate = useNavigate();  

  useEffect(() => {
    if (id) {
      axios.get(`${process.env.REACT_APP_API_URL}/employees/find/${id}`)
        .then(response => setEmployee(response.data))
        .catch(error => console.error(error));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      axios.put(`${process.env.REACT_APP_API_URL}/employees/${id}`, employee)
        .then(() => navigate('/employees'))  // Reemplazo de history.push() por navigate()
        .catch(error => console.error(error));
    } else {
      axios.post(`${process.env.REACT_APP_API_URL}/employees`, employee)
        .then(() => navigate('/employees'))  // Reemplazo de history.push() por navigate()
        .catch(error => console.error(error));
    }
  };

  return (
    <div>
      {/* Formulario aquí */}
    </div>
  );
};

export default EmployeeForm;
