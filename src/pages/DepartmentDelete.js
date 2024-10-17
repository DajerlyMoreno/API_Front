import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const DepartmentDelete = () => {
  const { id } = useParams(); // Obtener el ID del departamento de la URL
  const [message, setMessage] = useState(''); // Estado para almacenar el mensaje de éxito o error
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate(); // Hook para la navegación
  const token = localStorage.getItem('token'); // Obtener el token desde localStorage (o donde lo tengas almacenado)

  const deleteDepartment = async () => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_API_URL}/departments/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}` // Añadir el token a los headers para la autorización
        }
      });
      
      console.log("Response from API:", response.data); // Log para verificar la respuesta de la API

      if (response.data.state === "Departamneto eliminado con éxito") {
        setMessage("Departamento eliminado con éxito.");
        setTimeout(() => {
          navigate('/dashboard'); // Redirigir a la lista de departamentos o a otra ruta
        }, 2000); // Esperar 2 segundos antes de redirigir
      } else {
        setError('No se pudo eliminar el departamento.');
      }
    } catch (error) {
      setError('Error al eliminar el departamento.');
      console.error('Error al eliminar el departamento:', error);
    }
  };

  return (
    <div className="container">
      <h1>Eliminar Departamento</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <p>¿Estás seguro de que deseas eliminar este departamento?</p>
      <button className="btn btn-danger" onClick={deleteDepartment}>Eliminar</button>
      <button className="btn btn-secondary mx-2" onClick={() => navigate(-1)}>Cancelar</button>
    </div>
  );
};

export default DepartmentDelete;
