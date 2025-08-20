const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Agendamento = require('../models/Agendamento');

// Middleware autenticar
function autenticar(req, res, next) {
  if (req.session.usuario) return next();
  res.redirect('/admin/login');
}

// Página login
router.get('/login', (req, res) => {
  res.render('login');
});

// Processa login
router.post('/login', async (req, res) => {
  const { usuario, senha } = req.body;
  const admin = await Usuario.findOne({ usuario });
  if (!admin) return res.render('login', { erro: 'Usuário não encontrado' });

  const senhaValida = await admin.validarSenha(senha);
  if (!senhaValida) return res.render('login', { erro: 'Senha incorreta' });

  req.session.usuario = admin.usuario;
  res.redirect('/admin/painel');
});

// Painel de agendamentos
router.get('/painel', autenticar, async (req, res) => {
  try {
    const agendamentos = await Agendamento.find().sort({ criadoEm: -1 }).lean();
    res.render('admin', { agendamentos, usuario: req.session.usuario });
  } catch (err) {
    console.error(err);
    res.send('Erro ao carregar os agendamentos');
  }
});

// Remover agendamento
router.post('/remover/:id', autenticar, async (req, res) => {
  try {
    await Agendamento.findByIdAndDelete(req.params.id);
    res.redirect('/admin/painel');
  } catch (err) {
    console.error(err);
    res.send('Erro ao remover agendamento');
  }
});

// Exibir formulário de edição
router.get('/editar/:id', autenticar, async (req, res) => {
  try {
    const agendamento = await Agendamento.findById(req.params.id).lean();
    if (!agendamento) return res.send('Agendamento não encontrado');
    res.render('editar', { agendamento, usuario: req.session.usuario });
  } catch (err) {
    console.error(err);
    res.send('Erro ao carregar agendamento para edição');
  }
});

// Processar edição
router.post('/editar/:id', autenticar, async (req, res) => {
  try {
    const { nome, telefone, data, hora, servico } = req.body;
    await Agendamento.findByIdAndUpdate(req.params.id, { nome, telefone, data, hora, servico });
    res.redirect('/admin/painel');
  } catch (err) {
    console.error(err);
    res.send('Erro ao atualizar agendamento');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/admin/login'));
});

module.exports = router;
