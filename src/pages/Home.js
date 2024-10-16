import React from 'react';
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="row align-items-center">
        <div className="col-md-6">
          <h1 className="company-name">PULSEbyte</h1>
          <p className="company-description">
            Bienvenidos a PULSEbyte, líder en soluciones innovadoras y de alta calidad. Nos dedicamos a mejorar la experiencia de nuestros clientes a través de tecnología avanzada y servicios excepcionales.
          </p>
        </div>

        <div className="col-md-6 text-center">
          <img src="/assets/logo.jpg" alt="Empresa Ficticia" className="img-fluid" />
        </div>
      </div>
    </div>
  );
};

export default Home;
