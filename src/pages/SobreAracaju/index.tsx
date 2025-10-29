import React from 'react';
import './styles.css';

const SobreAracaju: React.FC = () => {
  return (
    <div className="sobre-aracaju-container">
      <header className="sobre-aracaju-header">
        <h1>Conheça Aracaju</h1>
        <p>A capital de Sergipe que encanta pela sua beleza e história</p>
      </header>

      <main className="sobre-aracaju-content">
        <section className="historia-section">
          <h2>História de Aracaju</h2>
          <div className="historia-content">
            <div className="historia-texto">
              <p>
                Aracaju, capital do estado de Sergipe, foi fundada em 17 de março de 1855, sendo uma das primeiras cidades planejadas do Brasil. 
                Diferente da maioria das cidades brasileiras, que surgiram naturalmente, Aracaju foi projetada para ser a capital do estado, 
                substituindo São Cristóvão.
              </p>
              <p>
                O nome "Aracaju" tem origem na língua tupi e significa "cajueiro dos papagaios", uma referência à grande quantidade de cajueiros e 
                aves típicas da região. A cidade se destaca pelo seu traçado geométrico, com ruas retas e largas que convergem para o rio Sergipe.
              </p>
              <p>
                Ao longo dos anos, Aracaju se desenvolveu mantendo suas raízes históricas e culturais, sendo hoje uma das capitais com melhor 
                qualidade de vida do Nordeste brasileiro, conhecida por suas belas praias, cultura rica e gastronomia diversificada.
              </p>
            </div>
            <div className="historia-imagem">
              <img 
                src="https://www.visiteobrasil.com.br/galerias/brasil/se/aracaju/aracaju-vista-aerea.jpg" 
                alt="Vista aérea de Aracaju"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://via.placeholder.com/400x300?text=Imagem+de+Aracaju';
                }}
              />
            </div>
          </div>
        </section>

        <section className="curiosidades-section">
          <h2>Curiosidades</h2>
          <div className="curiosidades-grid">
            <div className="curiosidade-card">
              <h3>Orla de Atalaia</h3>
              <p>Uma das maiores orlas urbanas do Brasil, com 6km de extensão e diversas opções de lazer e gastronomia.</p>
            </div>
            <div className="curiosidade-card">
              <h3>Ponte do Imperador</h3>
              <p>Construída em 1860 para a visita de Dom Pedro II, é um dos principais cartões postais da cidade.</p>
            </div>
            <div className="curiosidade-card">
              <h3>Arquipélago de Aracaju</h3>
              <p>Formado por 5 ilhas, sendo a maior delas a Ilha de Santa Luzia, um importante sítio arqueológico.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default SobreAracaju;
