import React, { useState, useEffect } from 'react';
import './contato.css';

const Contato = () => {
  const [formData, setFormData] = useState({
    firstName: '', // Alterado de 'nome'
    lastName: '',  // Novo campo
    email: '',
    assunto: '',
    mensagem: ''
  });
  const [copiaEmail, setCopiaEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Unifica nome e sobrenome para o backend
    const dataToSend = { 
      ...formData, 
      nome: `${formData.firstName} ${formData.lastName}`.trim(),
      copiaEmail 
    };

    try {
      const response = await fetch('http://localhost:3001/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        setFormData({ firstName: '', lastName: '', email: '', assunto: '', mensagem: '' });
        setCopiaEmail(false);
      } else {
        throw new Error(result.error || 'Erro desconhecido no servidor.');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      alert('Falha ao enviar a mensagem. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    document.body.classList.add('contato-page_body');
    return () => {
      document.body.classList.remove('contato-page_body');
    };
  }, []);

  return (
    <div className="contato-wrapper">
      <h1 className="contato-title">Fale Conosco</h1>

      <main className="contato-main-content">
        {/* A seção de informações foi removida daqui */}

        <form className="contato-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">Nome *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Sobrenome</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="assunto">Assunto</label>
            <select 
              id="assunto" 
              name="assunto"
              value={formData.assunto}
              onChange={handleChange}
            >
              <option value="">Selecione um assunto</option>
              <option value="duvida">Dúvida</option>
              <option value="sugestao">Sugestão</option>
              <option value="parceria">Parceria</option>
              <option value="outro">Outro</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="email">E-mail *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="mensagem">Sua Mensagem *</label>
            <textarea
              id="mensagem"
              name="mensagem"
              value={formData.mensagem}
              onChange={handleChange}
              rows={5}
              required
            ></textarea>
          </div>

          <div className="form-group checkbox-group">
            <input 
              type="checkbox" 
              id="copiaEmail"
              checked={copiaEmail}
              onChange={(e) => setCopiaEmail(e.target.checked)}
            />
            <label htmlFor="copiaEmail">Desejo receber uma cópia desta mensagem.</label>
          </div>
          
          <button type="submit" className="submit-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </main>

      <footer className="contato-footer">
        <div className="footer-column">
          <span className="footer-email">contato@rolêaju.com.br</span>
          <p className="footer-address">Aracaju, Sergipe, Brasil</p>
          <p className="footer-copyright">© 2025 Rolê-Aju</p>
        </div>
        <div className="footer-column">
          <span className="footer-phone">+55 (79) 4002-8922</span>
          <div className="footer-links">
            <a href="/politica-de-privacidade">Política de Privacidade</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contato;
