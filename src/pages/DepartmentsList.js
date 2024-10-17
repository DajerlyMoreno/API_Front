import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DepartmentsList = () => {
  const [departments, setDepartments] = useState([]); // Inicializar como array vacío
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    // Obtener la lista de departamentos desde la API
    axios.get(`${process.env.REACT_APP_API_URL}/departments`)
      .then(response => {
        if (response.data.state && Array.isArray(response.data.data)) {
          setDepartments(response.data.data); // Establecer el array de departamentos
        } else {
          setError('La respuesta de la API no es válida');
        }
      })
      .catch(error => {
        setError('Error al obtener los departamentos');
        console.error("Error al obtener los departamentos:", error);
      });
  }, []);

  // Manejar errores
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Manejar el caso en que no hay departamentos disponibles
  if (departments.length === 0) {
    return <div>No hay departamentos disponibles.</div>;
  }

  return (
    <div className="container">
      <h1>Lista de Departamentos</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Número de Empleados</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {departments.map(department => (
            <tr key={department.id}>
              <td>{department.name}</td>
              <td>{department.numEmployees}</td>
              <td>
                <Link to={`/departments/${department.id}`} className="btn btn-primary btn-sm">Ver</Link>
                <Link to={`/departments/edit/${department.id}`} className="btn btn-warning btn-sm mx-2">Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/departments/create" className="btn btn-success">Agregar Departamento</Link>
    </div>
  );
};

export default DepartmentsList;
