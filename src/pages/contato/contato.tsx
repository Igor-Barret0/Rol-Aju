import React, { useState, useEffect } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiClock } from 'react-icons/fi';
import './contato.css';

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    mensagem: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o formulário
    console.log('Dados do formulário:', formData);
    alert('Mensagem enviada com sucesso!');
    setFormData({
      nome: '',
      email: '',
      telefone: '',
      mensagem: ''
    });
  };

  useEffect(() => {
    // Adiciona classe ao body quando o componente montar
    document.body.classList.add('sobre-page');
    
    // Remove a classe quando o componente desmontar
    return () => {
      document.body.classList.remove('sobre-page');
    };
  }, []);

  return (
    <div className="contato-container">
      <div className="contato-info">
        <h2>Fale Conosco</h2>
        <p>Estamos prontos para ajudar você a descobrir o melhor de Aracaju. Entre em contato para obter informações sobre pontos turísticos, eventos e dicas locais.</p>
        
        <div className="info-item">
          <FiMail className="info-icon" />
          <div>
            <h3>E-mail</h3>
            <p>contato@rolaju.com.br</p>
            <p>atendimento@rolaju.com.br</p>
          </div>
        </div>
        
        <div className="info-item">
          <FiPhone className="info-icon" />
          <div>
            <h3>Telefone/WhatsApp</h3>
            <p>+55 (79) 99999-9999</p>
            <p>Horário de atendimento: 8h às 18h</p>
          </div>
        </div>
        
        <div className="info-item">
          <FiMapPin className="info-icon" />
          <div>
            <h3>Endereço</h3>
            <p>Av. Beira Mar, 1000 - Atalaia</p>
            <p>Aracaju - SE, 49035-100</p>
            <p>Brasil</p>
          </div>
        </div>
        
        <div className="info-item">
          <FiClock className="info-icon" />
          <div>
            <h3>Horário de Funcionamento</h3>
            <p>Segunda a Sexta: 8h às 18h</p>
            <p>Sábado: 9h às 13h</p>
            <p>Domingo: Fechado</p>
          </div>
        </div>
      </div>
      
      <form className="contato-form" onSubmit={handleSubmit}>
        <h2>Envie sua Mensagem</h2>
        <p className="form-intro">Preencha o formulário abaixo e entraremos em contato o mais breve possível.</p>
        
        <div className="form-group">
          <label htmlFor="nome">Nome Completo *</label>
          <input
            type="text"
            id="nome"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            placeholder="Digite seu nome completo"
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group" style={{ flex: 1, marginRight: '1rem' }}>
            <label htmlFor="email">E-mail *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="seu@email.com"
              required
            />
          </div>
          
          <div className="form-group" style={{ flex: 1 }}>
            <label htmlFor="telefone">Telefone</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleChange}
              placeholder="(00) 00000-0000"
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="assunto">Assunto</label>
          <select 
            id="assunto" 
            className="form-select"
            style={{
              width: '100%',
              padding: '1rem 1.2rem',
              border: '1px solid #e0e6ed',
              borderRadius: '8px',
              fontSize: '1rem',
              backgroundColor: '#f8fafc',
              color: '#2c3e50',
              transition: 'all 0.3s ease',
              marginBottom: '1.8rem'
            }}
          >
            <option value="">Selecione um assunto</option>
            <option value="duvida">Dúvida</option>
            <option value="sugestao">Sugestão</option>
            <option value="parceria">Parceria</option>
            <option value="outro">Outro</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="mensagem">Sua Mensagem *</label>
          <textarea
            id="mensagem"
            name="mensagem"
            value={formData.mensagem}
            onChange={handleChange}
            placeholder="Como podemos ajudar? Escreva sua mensagem aqui..."
            rows={6}
            required
          ></textarea>
        </div>
        
        <div className="form-group" style={{ marginBottom: '2rem' }}>
          <label className="checkbox-label" style={{ display: 'flex', alignItems: 'flex-start' }}>
            <input 
              type="checkbox" 
              required 
              style={{
                marginRight: '10px',
                marginTop: '4px'
              }}
            />
            <span>Li e concordo com a <a href="/politica-de-privacidade" style={{ color: '#3498db', textDecoration: 'none' }}>Política de Privacidade</a> e com os <a href="/termos-de-uso" style={{ color: '#3498db', textDecoration: 'none' }}>Termos de Uso</a>.</span>
          </label>
        </div>
        
        <button type="submit" className="submit-btn">
          <FiSend className="icon" /> Enviar Mensagem
        </button>
        
        <p className="form-footer" style={{
          marginTop: '1.5rem',
          fontSize: '0.9rem',
          color: '#7f8c8d',
          textAlign: 'center'
        }}>
          * Campos obrigatórios
        </p>
      </form>
    </div>
  );
};

export default Contato;
