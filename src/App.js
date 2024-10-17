import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import { AuthProvider } from './context/authContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Menu from './pages/Menu';
import EmployeesList from './pages/EmployeesList';
import EmployeeForm from './pages/EmployeeForm';
import EmployeeEditForm from './pages/EmployeeEditForm';
//import EmployeeDetail from './pages/EmployeeDetail';
import DepartmentsList from './pages/DepartmentsList';
import DepartmentForm from './pages/DepartmentForm';
import DepartmentEditForm from './pages/DepartmentEditForm';
//import DepartmentDetail from './pages/DepartmentDetail';
//import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Menu />
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path="/employees" element={<EmployeesList />} /> 
        <Route path="/employees/create" element={<EmployeeForm />} />
        <Route path="/employees/edit/:id" element={<EmployeeEditForm />} />
        <Route path="/departments/edit/:id" element={<DepartmentEditForm />} />
        <Route path="/departments" element={<DepartmentsList />} />
        <Route path="/departments/create" element={<DepartmentForm />} />
        <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
