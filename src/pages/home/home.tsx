import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Importe o hook de navegação
import './home.css';
import imagemPrincipal from '../../assets/imagem-aracaju-home.jpg';
import { MultiStepModal, type UserPreferences } from '../../components/Modal/MultiStepModal';

export function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate(); // 2. Inicialize o hook

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleComplete = (data: UserPreferences) => {
    console.log('Enviando para o mapa as preferências:', data);
    // 3. AÇÃO: Navegue para a página do mapa, passando os dados no 'state'
    navigate('/mapa', { state: { preferences: data } });
  };

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
        <button className="home-button" onClick={handleOpenModal}>
          Começar
          <span>&#x2794;</span>
        </button>
      </div>

      {/* Modal Multi-Step */}
      <MultiStepModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onComplete={handleComplete}
      />
    </div>
  );
}