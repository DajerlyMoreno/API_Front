import React, { useState } from 'react';
import EmployeesList from './EmployeesList'; 
import EmployeeForm from './EmployeeForm'; 

const EmployeesPage = () => {
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm); 
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-center">Empleados</h1>
        <button onClick={toggleForm} className="btn btn-success">
          {showForm ? 'Volver a la lista' : 'Agregar Empleado'}
        </button>
      </div>

      {showForm ? <EmployeeForm /> : <EmployeesList />}
    </>
  );
};

export default EmployeesPage;
