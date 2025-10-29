import './home.css';
import imagemPrincipal from '../../assets/imagem-aracaju-home.jpg';

export function HomePage() {
  return (
    <div className="home-container">
      {/* Seção da Esquerda: Imagem */}
      <div className="home-image-section">
        <img src={imagemPrincipal} alt="Vista da cidade de Aracaju" className="home-image" />
      </div>

      {/* Seção da Direita: Texto e Botão */}
      <div className="home-content-section">
        <h1>Conheça Aracaju!</h1>
        <p>
          Conheça Aracaju, a capital de Sergipe, com suas
          praias tranquilas, cultura rica e gastronomia
          deliciosa. <br />Explore mercados, museus e atrações únicas que
          tornam cada visita inesquecível.
        </p>
        <button className="home-button">
          Começar
          <span>&#x2794;</span>
        </button>
      </div>
    </div>
  );
}