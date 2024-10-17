import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Dashboard from './pages/Dashboard';
//import Login from './pages/Login';
import EmployeesList from './pages/EmployeesList';
import EmployeeForm from './pages/EmployeeForm';
//import EmployeeDetail from './pages/EmployeeDetail';
import DepartmentsList from './pages/DepartmentsList';
import DepartmentForm from './pages/DepartmentForm';
//import DepartmentDetail from './pages/DepartmentDetail';
//import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/employees" element={<EmployeesList />} /> 
        <Route path="/employees/create" element={<EmployeeForm />} />
        <Route path="/employees/edit/:id" element={<EmployeeForm />} />
        <Route path="/departments" element={<DepartmentsList />} />
        <Route path="/departments/create" element={<DepartmentForm />} />
      </Routes>
    </Router>
  );
}

export default App;
