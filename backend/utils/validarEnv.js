const VARIAVEIS_OBRIGATORIAS = ['MONGO_URI', 'SESSION_SECRET'];

function validarEnv() {
  const ausentes = VARIAVEIS_OBRIGATORIAS.filter(v => !process.env[v]);

  if (ausentes.length > 0) {
    console.error('❌ Variáveis de ambiente obrigatórias não definidas:');
    ausentes.forEach(v => console.error(`   - ${v}`));
    console.error('Configure o arquivo backend/.env antes de iniciar o servidor.');
    process.exit(1);
  }

  if (process.env.SESSION_SECRET.length < 32) {
    console.error('❌ SESSION_SECRET muito curto. Use no mínimo 32 caracteres.');
    process.exit(1);
  }
}

module.exports = validarEnv;
