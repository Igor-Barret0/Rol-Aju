const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path'); // 1. Importe o módulo 'path'

// 2. Especifique o caminho para o arquivo .env
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

// --- As linhas de teste que adicionamos antes ---
console.log('EMAIL_USER lido do .env:', process.env.EMAIL_USER);
console.log('EMAIL_PASS lido do .env está presente?', !!process.env.EMAIL_PASS);
// ---------------------------------------------

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(cors()); // Permite que seu frontend faça requisições para este backend
app.use(express.json()); // Permite que o servidor entenda o JSON enviado pelo frontend

// Configuração do Nodemailer
// ATENÇÃO: Use "App Passwords" (Senhas de App) se estiver usando Gmail com 2FA.
const transporter = nodemailer.createTransport({
  service: 'gmail', // Ou outro provedor de e-mail
  auth: {
    user: process.env.EMAIL_USER, // Seu e-mail
    pass: process.env.EMAIL_PASS  // Sua senha de app
  }
});

// Rota para enviar o e-mail
app.post('/api/send-email', async (req, res) => {
  const { nome, email, telefone, assunto, mensagem, copiaEmail } = req.body;

  // Validação básica
  if (!nome || !email || !mensagem) {
    return res.status(400).json({ error: 'Campos obrigatórios não preenchidos.' });
  }

  // Opções de e-mail para o dono do site
  const mailOptionsOwner = {
    from: `"${nome}" <${process.env.EMAIL_USER}>`,
    to: 'contato@rolaju.com.br', // O e-mail que receberá a mensagem
    replyTo: email,
    subject: `Novo Contato (Rol-Aju): ${assunto || 'Sem Assunto'}`,
    html: `
      <h2>Nova mensagem de contato recebida!</h2>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Telefone:</strong> ${telefone || 'Não informado'}</p>
      <p><strong>Assunto:</strong> ${assunto || 'Não informado'}</p>
      <hr>
      <h3>Mensagem:</h3>
      <p>${mensagem}</p>
    `
  };

  try {
    // 1. Envia o e-mail para o dono do site
    await transporter.sendMail(mailOptionsOwner);
    console.log('E-mail para o administrador enviado com sucesso.');

    // 2. Se o usuário pediu, envia uma cópia para ele
    if (copiaEmail) {
      const mailOptionsUser = {
        from: '"Rol-Aju" <contato@rolaju.com.br>',
        to: email,
        subject: 'Cópia da sua mensagem para Rol-Aju',
        html: `
          <h2>Obrigado por entrar em contato!</h2>
          <p>Recebemos sua mensagem e responderemos em breve. Abaixo está uma cópia dos dados que você enviou:</p>
          <hr>
          <p><strong>Nome:</strong> ${nome}</p>
          <p><strong>Telefone:</strong> ${telefone || 'Não informado'}</p>
          <p><strong>Assunto:</strong> ${assunto || 'Não informado'}</p>
          <h3>Sua Mensagem:</h3>
          <p>${mensagem}</p>
          <hr>
          <p><em>Atenciosamente, Equipe Rol-Aju.</em></p>
        `
      };
      await transporter.sendMail(mailOptionsUser);
      console.log('Cópia para o usuário enviada com sucesso.');
    }

    res.status(200).json({ message: 'Mensagem enviada com sucesso!' });

  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ error: 'Ocorreu um erro ao enviar a mensagem.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});