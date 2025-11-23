import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { FiMapPin, FiList, FiPhone, FiInfo, FiSearch, FiChevronDown } from 'react-icons/fi';
import logoImage from '../../assets/transparent-logo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

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

  const navClassName = `navbar ${!isHomePage ? 'navbar-internal' : ''} ${isHomePage && scrolled ? 'scrolled' : ''}`;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

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
        
        <form onSubmit={handleSearch} className="search-bar">
          <input 
            type="text" 
            placeholder="Buscar lugares..." 
            className="search-input" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button" aria-label="Buscar">
            <FiSearch />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
