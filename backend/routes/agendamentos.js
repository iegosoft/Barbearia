const express = require('express');
const router = express.Router();
const Agendamento = require('../models/Agendamento');

function autenticar(req, res, next) {
  if (req.session.usuario) return next();
  res.status(401).json({ erro: 'Não autorizado' });
}

router.get('/', autenticar, async (req, res) => {
  try {
    const agendamentos = await Agendamento.find().sort({ criadoEm: -1 }).lean();
    res.json(agendamentos);
  } catch {
    res.status(500).json({ erro: 'Erro ao carregar agendamentos' });
  }
});

router.get('/:id', autenticar, async (req, res) => {
  try {
    const agendamento = await Agendamento.findById(req.params.id).lean();
    if (!agendamento) return res.status(404).json({ erro: 'Agendamento não encontrado' });
    res.json(agendamento);
  } catch {
    res.status(500).json({ erro: 'Erro ao buscar agendamento' });
  }
});

router.post('/', async (req, res) => {
  try {
    const { nome, telefone, data, hora, servico } = req.body;
    const novo = new Agendamento({ nome, telefone, data, hora, servico });
    await novo.save();
    res.status(201).json({ sucesso: true });
  } catch {
    res.status(500).json({ erro: 'Erro ao salvar agendamento' });
  }
});

router.put('/:id', autenticar, async (req, res) => {
  try {
    const { nome, telefone, data, hora, servico } = req.body;
    await Agendamento.findByIdAndUpdate(req.params.id, { nome, telefone, data, hora, servico });
    res.json({ sucesso: true });
  } catch {
    res.status(500).json({ erro: 'Erro ao atualizar agendamento' });
  }
});

router.delete('/:id', autenticar, async (req, res) => {
  try {
    await Agendamento.findByIdAndDelete(req.params.id);
    res.json({ sucesso: true });
  } catch {
    res.status(500).json({ erro: 'Erro ao remover agendamento' });
  }
});

module.exports = router;
