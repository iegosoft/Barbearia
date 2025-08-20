const express = require('express');
const router = express.Router();
const Agendamento = require('../models/Agendamento');

router.get('/', (req, res) => {
  res.render('home');
});

router.post('/agendar', async (req, res) => {
  try {
    const { nome, telefone, data, hora, servico } = req.body;
    const novo = new Agendamento({ nome, telefone, data, hora, servico });
    await novo.save();
    res.render('home', { sucesso: true });
  } catch (err) {
    console.error(err);
    res.render('home', { erro: 'Erro ao salvar agendamento' });
  }
});

module.exports = router;
