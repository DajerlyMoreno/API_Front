import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importar useNavigate
import axios from 'axios';

const DepartmentDetail = () => {
  const { id } = useParams(); // Obtener el ID del departamento de la URL
  const [department, setDepartment] = useState(null); // Estado para almacenar los datos del departamento
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate(); // Inicializar useNavigate aquí

  useEffect(() => {
    const fetchDepartmentDetails = async () => {
      console.log(`Fetching details for department ID: ${id}`); // Log para verificar el ID
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/departments/${id}`);
        console.log("Response from API:", response.data); // Log de la respuesta completa
        if (response.data.state) {
          setDepartment(response.data.data);
        } else {
          setError('No se encontró el departamento');
        }
      } catch (error) {
        setError('Error al obtener los detalles del departamento');
        console.error('Error al obtener los detalles del departamento:', error);
      }
    };

    fetchDepartmentDetails();
  }, [id]);

  // Si hay un error, mostrarlo
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Si los datos del departamento no se han cargado todavía, mostrar un mensaje de carga
  if (!department) {
    return <div>Cargando detalles del departamento...</div>;
  }

  return (
    <div className="container">
      <h1>Detalles del Departamento</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Nombre: {department.name}</h5>
          <p className="card-text">ID: {department.id}</p>
          <p className="card-text">Número de Empleados: {department.numEmployees}</p>
          
          <h6>Empleados:</h6>
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Email</th>
                <th scope="col">Teléfono</th>
                <th scope="col">Salario</th>
              </tr>
            </thead>
            <tbody>
              {department.employees.map(employee => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.salary}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-primary" onClick={() => navigate(-1)}>Volver</button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentDetail;
