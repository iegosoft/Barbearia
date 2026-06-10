const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');

router.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;
  const admin = await Usuario.findOne({ usuario });
  if (!admin) return res.status(401).json({ erro: 'Usuário não encontrado' });

  const senhaValida = await admin.validarSenha(senha);
  if (!senhaValida) return res.status(401).json({ erro: 'Senha incorreta' });

  req.session.usuario = admin.usuario;
  res.json({ sucesso: true, usuario: admin.usuario });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => res.json({ sucesso: true }));
});

router.get('/me', (req, res) => {
  if (req.session.usuario) {
    res.json({ autenticado: true, usuario: req.session.usuario });
  } else {
    res.status(401).json({ autenticado: false });
  }
});

module.exports = router;
