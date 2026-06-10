const crypto = require('crypto');
const Usuario = require('../models/Usuario');

async function criarAdmin() {
  const adminExistente = await Usuario.findOne({ usuario: 'admin' });
  if (adminExistente) return;

  const senha = process.env.ADMIN_SENHA || gerarSenhaAleatoria();

  if (!process.env.ADMIN_SENHA) {
    console.warn('⚠️  ADMIN_SENHA não definida no .env.');
    console.warn(`⚠️  Senha gerada automaticamente: ${senha}`);
    console.warn('⚠️  Defina ADMIN_SENHA no .env para fixar a senha do admin.');
  }

  const novoAdmin = new Usuario({ usuario: 'admin', senha });
  await novoAdmin.save();
  console.log('✅ Usuário admin criado com sucesso.');
}

function gerarSenhaAleatoria() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = criarAdmin;
