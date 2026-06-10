const express = require('express');
const router = express.Router();
const Agendamento = require('../models/Agendamento');
const validarAgendamento = require('../utils/validarAgendamento');

const BARBEIROS = ['Iego Costa', 'Choze', 'Margarida', 'Karina', 'Elizabeth'];
const STATUS_VALIDOS = ['pendente', 'concluido', 'remarcado', 'cancelado'];

function autenticar(req, res, next) {
  if (req.session.usuario) return next();
  res.status(401).json({ erro: 'Não autorizado' });
}

// Lista barbeiros disponíveis (público — usado no formulário de agendamento)
router.get('/barbeiros', (req, res) => {
  res.json(BARBEIROS);
});

// Estatísticas do dashboard — sempre sobre todos os registros, sem filtros
router.get('/stats', autenticar, async (req, res) => {
  try {
    const hoje = new Date();
    const dataHoje = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`;

    const [totalHoje, pendentes, concluidosHoje, pendentesHoje] = await Promise.all([
      Agendamento.countDocuments({ data: dataHoje }),
      Agendamento.countDocuments({ status: 'pendente' }),
      Agendamento.countDocuments({ data: dataHoje, status: 'concluido' }),
      Agendamento.countDocuments({ data: dataHoje, status: 'pendente' }),
    ]);

    res.json({ hoje: totalHoje, pendentes, concluidosHoje, pendentesHoje });
  } catch {
    res.status(500).json({ erro: 'Erro ao calcular estatísticas' });
  }
});

// Lista agendamentos com filtros opcionais
router.get('/', autenticar, async (req, res) => {
  try {
    const { data, barbeiro, status } = req.query;
    const filtro = {};
    if (data)     filtro.data     = data;
    if (barbeiro) filtro.barbeiro = barbeiro;
    if (status)   filtro.status   = status;

    const agendamentos = await Agendamento.find(filtro).sort({ data: 1, hora: 1 }).lean();
    res.json(agendamentos);
  } catch {
    res.status(500).json({ erro: 'Erro ao carregar agendamentos' });
  }
});

// Busca um agendamento por ID
router.get('/:id', autenticar, async (req, res) => {
  try {
    const agendamento = await Agendamento.findById(req.params.id).lean();
    if (!agendamento) return res.status(404).json({ erro: 'Agendamento não encontrado' });
    res.json(agendamento);
  } catch {
    res.status(500).json({ erro: 'Erro ao buscar agendamento' });
  }
});

// Cria agendamento (público)
router.post('/', async (req, res) => {
  try {
    const { nome, telefone, data, hora, servico, barbeiro } = req.body;

    const erros = validarAgendamento({ nome, telefone, data, hora, servico, barbeiro });
    if (erros.length > 0) return res.status(400).json({ erro: erros[0] });

    // Conflito: mesmo barbeiro, mesma data, mesma hora, status ativo
    const conflito = await Agendamento.findOne({
      barbeiro, data, hora,
      status: { $nin: ['cancelado', 'remarcado'] },
    });
    if (conflito) {
      return res.status(409).json({ erro: `${barbeiro} já possui agendamento nesse horário. Escolha outro barbeiro ou horário.` });
    }

    const novo = new Agendamento({ nome, telefone, data, hora, servico, barbeiro });
    await novo.save();
    res.status(201).json({ sucesso: true, id: novo._id });
  } catch {
    res.status(500).json({ erro: 'Erro ao salvar agendamento' });
  }
});

// Atualiza agendamento completo
router.put('/:id', autenticar, async (req, res) => {
  try {
    const { nome, telefone, data, hora, servico, barbeiro, status } = req.body;

    const erros = validarAgendamento({ nome, telefone, data, hora, servico, barbeiro });
    if (erros.length > 0) return res.status(400).json({ erro: erros[0] });

    if (status && !STATUS_VALIDOS.includes(status)) {
      return res.status(400).json({ erro: 'Status inválido' });
    }

    const conflito = await Agendamento.findOne({
      barbeiro, data, hora,
      status: { $nin: ['cancelado', 'remarcado'] },
      _id: { $ne: req.params.id },
    });
    if (conflito) {
      return res.status(409).json({ erro: `${barbeiro} já possui agendamento nesse horário.` });
    }

    const campos = { nome, telefone, data, hora, servico, barbeiro };
    if (status) campos.status = status;

    const atualizado = await Agendamento.findByIdAndUpdate(
      req.params.id,
      campos,
      { new: true }
    );
    if (!atualizado) return res.status(404).json({ erro: 'Agendamento não encontrado' });

    res.json({ sucesso: true });
  } catch {
    res.status(500).json({ erro: 'Erro ao atualizar agendamento' });
  }
});

// Atualiza apenas o status
router.patch('/:id/status', autenticar, async (req, res) => {
  try {
    const { status } = req.body;
    if (!STATUS_VALIDOS.includes(status)) {
      return res.status(400).json({ erro: 'Status inválido' });
    }

    const atualizado = await Agendamento.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!atualizado) return res.status(404).json({ erro: 'Agendamento não encontrado' });

    res.json({ sucesso: true, status: atualizado.status });
  } catch {
    res.status(500).json({ erro: 'Erro ao atualizar status' });
  }
});

// Remove agendamento
router.delete('/:id', autenticar, async (req, res) => {
  try {
    const removido = await Agendamento.findByIdAndDelete(req.params.id);
    if (!removido) return res.status(404).json({ erro: 'Agendamento não encontrado' });
    res.json({ sucesso: true });
  } catch {
    res.status(500).json({ erro: 'Erro ao remover agendamento' });
  }
});

module.exports = router;
