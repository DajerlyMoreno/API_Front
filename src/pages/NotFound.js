import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container text-center">
      <h1 className="display-4">404</h1>
      <h2>Página No Encontrada</h2>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link to="/" className="btn btn-primary">Volver a la Página Principal</Link>
    </div>
  );
};

export default NotFound;
