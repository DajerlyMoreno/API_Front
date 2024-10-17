import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeEditForm = () => {
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    phone: '',
    salary: '',
    department: ''
  });

  const { id } = useParams(); // Obtener el ID del empleado de la URL
  const navigate = useNavigate();  

  // Cargar datos del empleado si id está presente
  useEffect(() => {
    if (id) {
      axios.get(`${process.env.REACT_APP_API_URL}/employees/${id}`)
        .then(response => {
          if (response.data.state) {
            setEmployee(response.data.data); // Establecer datos del empleado
          } else {
            console.error('No se encontró el empleado');
          }
        })
        .catch(error => {
          console.error('Error al obtener el empleado:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({ ...employee, [name]: value }); // Actualizar el estado del empleado
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Actualizar el empleado usando PUT
    axios.put(`${process.env.REACT_APP_API_URL}/employees/${id}`, employee)
      .then(() => navigate('/dashboard')) // Redirigir a la lista de empleados después de la actualización
      .catch(error => {
        console.error('Error al actualizar el empleado:', error);
      });
  };

  return (
    <div className="container">
      <h1>Editar Empleado</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={employee.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            value={employee.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Teléfono:</label>
          <input
            type="text"
            name="phone"
            className="form-control"
            value={employee.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Salario:</label>
          <input
            type="number"
            name="salary"
            className="form-control"
            value={employee.salary}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Departamento:</label>
          <input
            type="text"
            name="department"
            className="form-control"
            value={employee.department}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>
    </div>
  );
};

export default EmployeeEditForm;
