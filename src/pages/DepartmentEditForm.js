import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DepartmentEditForm = () => {
  const [department, setDepartment] = useState({
    name: ''
  });
  const { id } = useParams(); // Obtener el ID del departamento de la URL
  const navigate = useNavigate();

  // Cargar datos del departamento si id está presente
  useEffect(() => {
    if (id) {
      const token = localStorage.getItem('token'); // Obtener el token almacenado

      console.log('Token usado en GET:', token); // Verificar el token

      axios.get(`${process.env.REACT_APP_API_URL}/departments/${id}`, {
        headers: {
          Authorization: `Bearer ${token}` // Incluir el token en el encabezado
        }
      })
      .then(response => {
        console.log('Respuesta de GET:', response); // Verificar la respuesta de la API
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

  // Actualizar el estado cuando cambian los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDepartment({ ...department, [name]: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token'); // Obtener el token almacenado

    console.log('Token usado en PUT:', token); // Verificar el token antes de enviar la actualización
    console.log('Datos enviados en PUT:', department); // Verificar los datos enviados

    // Actualizar el departamento usando PUT, incluyendo el token en los headers
    axios.put(`${process.env.REACT_APP_API_URL}/departments/${id}`, department, {
      headers: {
        Authorization: `Bearer ${token}` // Incluir el token en el encabezado
      }
    })
    .then(response => {
      console.log('Respuesta de PUT:', response); // Verificar la respuesta de la API
      // Redirigir al dashboard después de la actualización exitosa
      navigate('/dashboard');
    })
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
