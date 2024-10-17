import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/EmployeeForm.css';

const EmployeeForm = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [department, setDepartment] = useState('');
  const [departments, setDepartments] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  // Cargar departamentos
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/departments`);
        setDepartments(response.data.data); // Asume que la respuesta contiene los departamentos en "data.data"
      } catch (error) {
        console.error("Error al cargar los departamentos:", error);
        setError("Error al cargar la lista de departamentos.");
      }
    };

    fetchDepartments();
  }, []);

  // Manejar envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newEmployee = {
      id,
      name,
      phone,
      email,
      salary,
      department
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/employees`, newEmployee);

      if (response.status === 201) {
        setSuccess("Empleado creado exitosamente.");
        setError(null);
        setId('');
        setName('');
        setPhone('');
        setEmail('');
        setSalary('');
        setDepartment('');
        navigate('/dashboard');
      } else {
        setError("Ocurrió un error al crear el empleado.");
      }
    } catch (error) {
      console.error("Error al crear el empleado:", error);
      setError("Ocurrió un error. Por favor intenta de nuevo.");
    }
  };

  return (
    <div className="dashboard-content"> {/* Nueva clase para ajustar dentro del dashboard */}
      <div className="employee-form-container">
        <form onSubmit={handleSubmit}>
          <h2>Crear Empleado</h2>

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
              placeholder="Ingresa el ID del empleado"
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
              placeholder="Ingresa el nombre del empleado"
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Teléfono</label>
            <input
              type="text"
              id="phone"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Ingresa el número de teléfono"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Ingresa el correo electrónico"
            />
          </div>

          <div className="form-group">
            <label htmlFor="salary">Salario</label>
            <input
              type="number"
              id="salary"
              className="form-control"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              required
              placeholder="Ingresa el salario"
            />
          </div>

          <div className="form-group">
            <label htmlFor="department">Departamento</label>
            <select
              id="department"
              className="form-control"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            >
              <option value="">Selecciona un departamento</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Crear Empleado</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
