import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmployeesList = () => {
  const [employees, setEmployees] = useState([]); 
  const [error, setError] = useState(null);  

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/employees`)
      .then(response => {
        if (response.data.state && Array.isArray(response.data.data)) {
          setEmployees(response.data.data);  
        } else {
          setError('La respuesta de la API no es válida');
        }
      })
      .catch(error => {
        setError('Error al obtener los empleados');
        console.error("Error al obtener los empleados:", error);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (employees.length === 0) {
    return <div>No hay empleados disponibles.</div>;
  }

  return (
    <div className="container">
      <h1>Lista de Empleados</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>
                <Link to={`/employees/${employee._id}`} className="btn btn-primary btn-sm">Ver</Link>
                <Link to={`/employees/edit/${employee._id}`} className="btn btn-warning btn-sm mx-2">Editar</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/employees/create" className="btn btn-success">Agregar Empleado</Link>
    </div>
  );
};

export default EmployeesList;

