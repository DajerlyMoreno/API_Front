import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css'; 

const Login = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const credentials = { id, name };
    try {
      
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/loging`, credentials);
      const data = response.data;
      if (response.status === 200 && data !== "Credenciales invalidas") {
        localStorage.setItem('token', data);

        navigate('/dashboard');
      } else {
        setError(data);
      }
    } catch (error) {
      console.error("Error durante el inicio de sesión:", error);
      setError("Ocurrió un error al intentar iniciar sesión. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className="login-container container-fluid d-flex align-items-center justify-content-center">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <form className="login-form p-4 bg-white shadow" onSubmit={handleLogin}>
            <h2 className="text-center mb-4">Iniciar Sesión</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <div className="form-group mb-3">
              <label htmlFor="id">ID</label>
              <input 
                type="text" 
                id="id" 
                className="form-control" 
                value={id} 
                onChange={(e) => setId(e.target.value)} 
                placeholder="Ingresa tu ID" 
                required 
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="name">Nombre</label>
              <input 
                type="text" 
                id="name" 
                className="form-control" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Ingresa tu Nombre" 
                required 
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block w-100">Ingresar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
