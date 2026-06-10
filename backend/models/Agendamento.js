const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema({
  nome:     { type: String, required: true, trim: true },
  telefone: { type: String, required: true, trim: true },
  data:     { type: String, required: true },
  hora:     { type: String, required: true },
  servico:  { type: String, required: true },
  barbeiro: { type: String, required: true },
  status:   { type: String, enum: ['pendente', 'concluido', 'remarcado', 'cancelado'], default: 'pendente' },
  criadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Agendamento', AgendamentoSchema);
