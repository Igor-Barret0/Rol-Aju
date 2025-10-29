import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FiMapPin, FiList, FiPhone, FiInfo, FiSearch, FiChevronDown } from 'react-icons/fi';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);
  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="nav-left">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/mapa" className="nav-link">
                <FiMapPin className="nav-icon" /> Mapa
              </Link>
            </li>
            <li className="nav-item dropdown">
              <div className="nav-link">
                <FiList className="nav-icon" /> Categorias <FiChevronDown size={16} style={{ marginLeft: '4px' }} />
                <div className="dropdown-content">
                  <div className="dropdown-header">Comer e Beber</div>
                  <Link to="/categorias/restaurantes" className="dropdown-item">Restaurantes</Link>
                  <Link to="/categorias/bares" className="dropdown-item">Bares</Link>
                  <Link to="/categorias/cafeterias" className="dropdown-item">Cafeterias</Link>
                  
                  <div className="dropdown-divider"></div>
                  
                  <div className="dropdown-header">Lazer</div>
                  <Link to="/categorias/praias" className="dropdown-item">Praias</Link>
                  <Link to="/categorias/parques" className="dropdown-item">Parques</Link>
                  <Link to="/categorias/museus" className="dropdown-item">Museus</Link>
                  
                  <div className="dropdown-divider"></div>
                  
                  <div className="dropdown-header">Compras</div>
                  <Link to="/categorias/shoppings" className="dropdown-item">Shoppings</Link>
                  <Link to="/categorias/feiras" className="dropdown-item">Feiras Livres</Link>
                  <Link to="/categorias/artesanato" className="dropdown-item">Artesanato</Link>
                </div>
              </div>
            </li>
          </ul>
        </div>
        
        <div className="nav-right">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/contato" className="nav-link">
                <FiPhone className="nav-icon" /> Contato
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/sobre" className="nav-link">
                <FiInfo className="nav-icon" /> Sobre Aracaju
              </Link>
            </li>
          </ul>
          
          <div className="search-bar">
            <input type="text" placeholder="Buscar..." className="search-input" />
            <button className="search-button">
              <FiSearch />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
