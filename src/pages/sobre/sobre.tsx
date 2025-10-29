import { useEffect } from 'react';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';
import './styles.css';

export function AboutPage() {
  useEffect(() => {
    // Adiciona classe ao body quando o componente montar
    document.body.classList.add('sobre-page');
    
    // Remove a classe quando o componente desmontar
    return () => {
      document.body.classList.remove('sobre-page');
    };
  }, []);

  return (
    <div className="sobre-aracaju">
      {/* Banner Principal */}
      <div className="banner-container">
        <img 
          src="/banner-image-4.jpeg" 
          alt="Vista panorâmica de Aracaju" 
          className="banner-image"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/1920x400?text=Banner+Aracaju';
          }}
        />
      </div>

      <header className="hero">
        <div className="container">
          <h1>Sobre Aracaju</h1>
          <div className="breadcrumb">
            <a href="/">Home</a>
            <FiArrowRight className="breadcrumb-arrow" />
            <span>Sobre Aracaju</span>
          </div>
        </div>
      </header>

<div className="container">
        <div className="content-wrapper">
          <article className="main-content">
            <section className="section">
              <h2>Origem do Nome</h2>
              <p>
                Aracaju significa "cajueiro dos papagaios". A palavra é composta por dois elementos: 
                <strong>"ará"</strong>, que significa 'papagaio', e <strong>"acayú"</strong>, que 
                significa 'fruto do cajueiro'. Esta interpretação tem grande vigência, 
                embora existam outras versões.
              </p>
              
              <h3>História</h3>
              <p>
                No século XVI, as terras de Aracaju compreendiam 160 quilômetros de costa, 
                o litoral entre os rios Real e São Francisco, e em todas as margens do 
                estuário não existia uma vila sequer. Na segunda metade do século XVII, 
                apenas arraiais de pescadores eram encontrados nessa região.
              </p>
              
              <div className="info-card">
                <div className="info-icon">
                  <FiCalendar />
                </div>
                <div className="info-content">
                  <h4>Fundação</h4>
                </div>
              </div>

              <p>Aracaju, capital do estado de Sergipe, é uma cidade que encanta pela sua história, cultura e belezas naturais. Fundada em 17 de março de 1855, a cidade foi planejada para ser a nova capital da província, substituindo São Cristóvão.</p>
              
              <div className="image-container">
                <img 
                  src="/Capital (00042)(0000).jpg" 
                  alt="Vista aérea de Aracaju" 
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/800x450?text=Vista+Aérea+de+Aracaju';
                  }}
                />
              </div>

              <h3>Planejamento Urbano</h3>
              <p>Diferente da maioria das cidades brasileiras da época, Aracaju nasceu de um projeto urbanístico inovador, com ruas retas e largas que se cruzam em ângulos retos, inspirado no modelo de cidades planejadas.</p>

              <h3>Desenvolvimento e Modernização</h3>
              <p>Ao longo dos anos, Aracaju se desenvolveu mantendo o equilíbrio entre a modernidade e a preservação de suas raízes culturais. Hoje, é conhecida por suas praias deslumbrantes, culinária rica e pelo povo acolhedor.</p>

              <div className="image-container">
                <img 
                  src="https://www.visiteobrasil.com.br/galerias/brasil/se/aracaju/centro-historico.jpg" 
                  alt="Centro Histórico de Aracaju" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/800x450?text=Centro+Hist%C3%B3rico';
                  }}
                />
              </div>

              <h3>Cultura e Lazer</h3>
              <p>A cidade oferece diversas opções de lazer e cultura, como o Mercado Municipal, o Museu da Gente Sergipana, o Oceanário e o Parque dos Cajueiros. Além disso, é famosa por suas festas tradicionais, como o Forró Caju e o Arraial do Banho de Cheiro.</p>

              <div className="info-card">
                <div className="info-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div className="info-content">
                  <h4>Localização Estratégica</h4>
                  <p>Situada no litoral, Aracaju é banhada pelo Oceano Atlântico e cortada pelo rio Sergipe, oferecendo belas paisagens naturais.</p>
                </div>
              </div>
            </section>
          </article>

          <aside className="sidebar">
            <div className="sidebar-section">
              <h3>Pontos Turísticos</h3>
              
              <div className="sidebar-card">
                <img 
                  src="/orla de atalaia.jpg" 
                  alt="Orla de Atalaia"
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/350x180?text=Orla+de+Atalaia';
                  }}
                />
                <div className="sidebar-card-content">
                  <h4>Orla de Atalaia</h4>
                  <p>Um dos principais cartões-postais da cidade, com diversos bares, restaurantes e atrações como o Oceanário e o Arcos da Orla.</p>
                </div>
              </div>

              <div className="sidebar-card">
                <img 
                  src="/museu-gente-sergipana3 (2).jpg" 
                  alt="Museu da Gente Sergipana"
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/350x180?text=Museu+da+Gente+Sergipana';
                  }}
                />
                <div className="sidebar-card-content">
                  <h4>Museu da Gente Sergipana</h4>
                  <p>Um museu interativo que conta a história e a cultura do povo sergipano de forma lúdica e tecnológica.</p>
                </div>
              </div>

              <div className="sidebar-card">
                <img 
                  src="/parque-dos-cajueiros-sergipe-turismo.webp" 
                  alt="Parque dos Cajueiros"
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/350x180?text=Parque+dos+Cajueiros';
                  }}
                />
                <div className="sidebar-card-content">
                  <h4>Parque dos Cajueiros</h4>
                  <p>Um dos maiores parques urbanos do Brasil, com pistas de caminhada, ciclovia e ampla área verde para lazer.</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;