import React from 'react';
import { Link } from 'react-router-dom';
import '../Dashboard.css';

const Dashboard = ({ children }) => {
  return (
    <div className="d-flex" id="wrapper">
      {/* Sidebar */}
      <div className="bg-light border-right" id="sidebar-wrapper">
        <div className="sidebar-heading">Gestión de Empleados</div>
        <div className="list-group list-group-flush">
          <Link to="/dashboard" className="list-group-item list-group-item-action bg-light">Dashboard</Link>
          <Link to="/employees" className="list-group-item list-group-item-action bg-light">Empleados</Link>
          <Link to="/departments" className="list-group-item list-group-item-action bg-light">Departamentos</Link>
          <Link to="/settings" className="list-group-item list-group-item-action bg-light">Configuraciones</Link>
        </div>
      </div>

      {/* Page Content */}
      <div id="page-content-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
          <button className="btn btn-primary" id="menu-toggle">Toggle Menu</button>
        </nav>

        <div className="container-fluid">
          <h1 className="mt-4">Dashboard</h1>
          <p>Este es el contenido principal de tu dashboard.</p>

          {/* Aquí se renderiza el contenido dinámico */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
