import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DepartmentEditForm = () => {
  const [department, setDepartment] = useState({
    name: '',
    employees: []
  });
  const { id } = useParams(); // Obtener el ID del departamento de la URL
  const navigate = useNavigate();

  // Cargar datos del departamento si id está presente
  useEffect(() => {
    if (id) {
      axios.get(`${process.env.REACT_APP_API_URL}/departments/${id}`)
        .then(response => {
          if (response.data.state) {
            setDepartment(response.data.data); // Establecer datos del departamento
          } else {
            console.error('No se encontró el departamento');
          }
        })
        .catch(error => {
          console.error('Error al obtener el departamento:', error);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value }); // Actualizar el estado del departamento
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Actualizar el departamento usando PUT
    axios.put(`${process.env.REACT_APP_API_URL}/departments/${id}`, department)
      .then(() => navigate('/departments')) // Redirigir a la lista de departamentos después de la actualización
      .catch(error => {
        console.error('Error al actualizar el departamento:', error);
      });
  };

  return (
    <div className="container">
      <h1>Editar Departamento</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={department.name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Actualizar</button>
      </form>
    </div>
  );
};

export default DepartmentEditForm;
