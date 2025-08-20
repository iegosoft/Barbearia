const mongoose = require('mongoose');

const AgendamentoSchema = new mongoose.Schema({
  nome: String,
  telefone: String,
  data: String,
  hora: String,
  servico: String,
  criadoEm: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Agendamento', AgendamentoSchema);
