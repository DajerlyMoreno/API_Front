import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/EmployeeForm.css';

const DepartmentForm = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDepartment = {
      id: parseInt(id), // Asegúrate de convertir a número si es necesario
      name,
      employees: [] // Inicialmente vacío
    };

    const token = localStorage.getItem('token'); // Obtén el token del localStorage

    try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/departments`,
        newDepartment,
        {
          headers: {
            Authorization: `Bearer ${token}` // Incluye el token en el encabezado
          }
        }
      );

      if (response.status === 200) {
        setSuccess("Departamento creado exitosamente.");
        setError(null);
        setId('');
        setName('');
        navigate('/dashboard');
      } else {
        setError("Ocurrió un error al crear el departamento.");
        console.log(response.status)
      }
    } catch (error) {
      console.error("Error al crear el departamento:", error);
      setError("Ocurrió un error. Por favor intenta de nuevo.");
    }
  };

  return (
    <div className="department-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Crear Departamento</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="form-group">
          <label htmlFor="id">ID</label>
          <input
            type="text"
            id="id"
            className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
            placeholder="Ingresa el ID del departamento"
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="Ingresa el nombre del departamento"
          />
        </div>

        <button type="submit" className="btn btn-primary">Crear Departamento</button>
      </form>
    </div>
  );
};

export default DepartmentForm;
