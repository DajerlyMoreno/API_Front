import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import axios from 'axios';

const EmployeeDetail = () => {
  const { id } = useParams(); // Obtener el ID del empleado de la URL
  const [employee, setEmployee] = useState(null); // Estado para almacenar los datos del empleado
  const [error, setError] = useState(null); // Estado para manejar errores
  const navigate = useNavigate(); // Inicializar useNavigate aquí

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      console.log(`Fetching details for employee ID: ${id}`); // Log para verificar el ID
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/employees/${id}`);
        console.log("Response from API:", response.data); // Log de la respuesta completa
        if (response.data.state) {
          console.log("hola");
          setEmployee(response.data.data);
        } else {
          setError('No se encontró el empleado');
        }
      } catch (error) {
        setError('Error al obtener los detalles del empleado');
        console.error('Error al obtener los detalles del empleado:', error);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  // Si hay un error, mostrarlo
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Si los datos del empleado no se han cargado todavía, mostrar un mensaje de carga
  if (!employee) {
    return <div>Cargando detalles del empleado...</div>;
  }

  return (
    <div className="container">
      <h1>Detalles del Empleado</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Nombre: {employee.name}</h5>
          <p className="card-text">Email: {employee.email}</p>
          <p className="card-text">Teléfono: {employee.phone}</p>
          <p className="card-text">Salario: {employee.salary}</p>
          <p className="card-text">Departamento: {employee.department}</p>
          <button className="btn btn-primary" onClick={() => navigate(-1)}>Volver</button> {/* Cambiado a botón */}
          <Link to={`/employees/edit/${employee._id}`} className="btn btn-warning mx-2">Editar</Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetail;
