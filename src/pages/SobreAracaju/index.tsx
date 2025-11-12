import React from 'react';
import Slider from 'react-slick';
import './styles.css';

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

const imagens = [
  { src: "/aracaju-1.jpg", alt: "Vista de Aracaju 1" },
  { src: "/aracaju-2.jpg", alt: "Vista de Aracaju 2" },
  { src: "/aracaju-3.jpeg", alt: "Vista de Aracaju 3" },
  { src: "/aracaju-4.jpg", alt: "Vista de Aracaju 4" },
  { src: "/aracaju-5.jpg", alt: "Vista de Aracaju 5" },
  { src: "/aracaju-6.jpg", alt: "Vista de Aracaju 6" },
  { src: "/aracaju-7.webp", alt: "Vista de Aracaju 7" },
];

const SobreAracaju: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true
  };

  return (
    <div className="sobre-aracaju-container">
      <header className="sobre-aracaju-header">
        <h1>Conheça Aracaju</h1>
        <p>A capital de Sergipe que encanta pela sua beleza e história</p>
      </header>

      <main>
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
                O nome "Aracaju" tem origem na língua tupi e significa "cajueiro dos papagaios", uma referência à grande quantidade de cajueiros 
                e aves típicas da região. A cidade se destaca pelo seu traçado geométrico, com ruas retas e largas que convergem para o rio Sergipe.
              </p>
              <p>
                Ao longo dos anos, Aracaju se desenvolveu mantendo suas raízes históricas e culturais, sendo hoje uma das capitais com melhor 
                qualidade de vida do Nordeste brasileiro, conhecida por suas belas praias, cultura rica e gastronomia diversificada.
              </p>
            </div>

            <div className="historia-carousel">
              <Slider {...settings}>
                {imagens.map((imagem, index) => (
                  <div key={index}>
                    <img src={imagem.src} alt={imagem.alt} />
                  </div>
                ))}
              </Slider>
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
