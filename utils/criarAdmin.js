const Usuario = require('../models/Usuario');

async function criarAdmin() {
  const adminExistente = await Usuario.findOne({ usuario: 'admin' });
  if (!adminExistente) {
    const novoAdmin = new Usuario({
      usuario: 'admin',
      senha: '1234'
    });
    await novoAdmin.save();
    console.log('Usuário admin criado com sucesso!');
  } else {
    console.log('Usuário admin já existe.');
  }
}

module.exports = criarAdmin;
