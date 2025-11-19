import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // 1. Importe useLocation
import './Navbar.css';
import { FiMapPin, FiList, FiPhone, FiInfo, FiSearch, FiChevronDown } from 'react-icons/fi';
import logoImage from '../../assets/transparent-logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation(); // 2. Obtenha a localização atual
  const isHomePage = location.pathname === '/'; // 3. Verifique se é a página inicial

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Só adiciona o listener de scroll se estiver na home
    if (isHomePage) {
      document.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (isHomePage) {
        document.removeEventListener('scroll', handleScroll);
      }
    };
  }, [scrolled, isHomePage]);

  // 4. Adicione a classe 'navbar-internal' se não for a home
  //    E a classe 'scrolled' só se aplica na home
  const navClassName = `navbar ${!isHomePage ? 'navbar-internal' : ''} ${isHomePage && scrolled ? 'scrolled' : ''}`;

  return (
    <nav className={navClassName}>
      <div className="navbar-container">
        <Link to="/" className="logo-placeholder">
          <img src={logoImage} alt="Logo do site" />
        </Link>

        {/* Links da Esquerda (Posicionados Absolutamente) */}
        <div className="nav-group nav-group-left">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/mapa" className="nav-link">
                <FiMapPin /> Mapa
              </Link>
            </li>
            <li className="nav-item dropdown">
              <div className="nav-link">
                <FiList /> Categorias <FiChevronDown size={16} />
                <div className="dropdown-content">
                  <div className="dropdown-column">
                    <Link to="/categorias/restaurantes-e-bares" className="dropdown-item">Restaurantes e Bares</Link>
                    <Link to="/categorias/praias-e-natureza" className="dropdown-item">Praias e Natureza</Link>
                    <Link to="/categorias/hospedagem" className="dropdown-item">Hospedagem</Link>
                    <Link to="/categorias/cultura-e-historia" className="dropdown-item">Cultura e História</Link>
                  </div>
                  <div className="dropdown-column">
                    <Link to="/categorias/lazer-e-entretenimento" className="dropdown-item">Lazer e Entretenimento</Link>
                    <Link to="/categorias/compras-e-artesanato" className="dropdown-item">Compras e Artesanato</Link>
                    <Link to="/categorias/eventos-e-festas" className="dropdown-item">Eventos e Festas</Link>
                    <Link to="/categorias/transportes-e-mobilidade" className="dropdown-item">Transportes e Mobilidade</Link>
                    <Link to="/categorias" className="dropdown-item bold-item">Ver Tudo</Link>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Links da Direita (Posicionados Absolutamente) */}
        <div className="nav-group nav-group-right">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/contato" className="nav-link nav-link-dark">
                <FiPhone /> Contato
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/sobre" className="nav-link nav-link-dark">
                <FiInfo /> Sobre Aracaju
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="search-bar">
          <input type="text" placeholder="" className="search-input" />
          <button className="search-button">
            <FiSearch />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
