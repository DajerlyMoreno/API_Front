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
                <Link to={`/departments/${department._id}`} className="btn btn-primary btn-sm">Ver</Link>
                <Link to={`/departments/edit/${department._id}`} className="btn btn-warning btn-sm mx-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-brush" viewBox="0 0 16 16">
                      <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.1 6.1 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.1 8.1 0 0 1-3.078.132 4 4 0 0 1-.562-.135 1.4 1.4 0 0 1-.466-.247.7.7 0 0 1-.204-.288.62.62 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896q.19.012.348.048c.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04M4.705 11.912a1.2 1.2 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.4 3.4 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3 3 0 0 0 .126-.75zm1.44.026c.12-.04.277-.1.458-.183a5.1 5.1 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005zm3.582-3.043.002.001h-.002z"/>
                    </svg>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentsList;
