const SERVICOS_VALIDOS = ['Corte', 'Barba', 'Corte + Barba'];

function validarAgendamento({ nome, telefone, data, hora, servico }) {
  const erros = [];

  // Campos obrigatórios e formatos
  if (!nome || !nome.trim())
    erros.push('Nome é obrigatório');
  else if (nome.trim().length < 3)
    erros.push('Nome deve ter pelo menos 3 caracteres');

  if (!telefone || !telefone.trim())
    erros.push('Telefone é obrigatório');
  else if (!/^[\d\s()\-+]{7,20}$/.test(telefone.trim()))
    erros.push('Telefone inválido. Use apenas números e os símbolos ( ) - +');

  if (!data)
    erros.push('Data é obrigatória');

  if (!hora)
    erros.push('Hora é obrigatória');

  if (!servico)
    erros.push('Serviço é obrigatório');
  else if (!SERVICOS_VALIDOS.includes(servico))
    erros.push('Serviço inválido. Escolha: Corte, Barba ou Corte + Barba');

  // Regras de data e horário (só valida se ambos foram informados)
  if (data && hora) {
    const hoje = new Date().toISOString().split('T')[0];
    if (data < hoje) {
      erros.push('Não é possível agendar para datas passadas');
    } else {
      // Constrói a data sem deslocamento de fuso (YYYY-MM-DD → local)
      const [ano, mes, dia] = data.split('-').map(Number);
      const diaSemana = new Date(ano, mes - 1, dia).getDay(); // 0=Dom, 6=Sáb

      if (diaSemana === 0) {
        erros.push('Não atendemos aos domingos');
      } else {
        const [h, m] = hora.split(':').map(Number);
        const minutos = h * 60 + m;
        const abertura = 9 * 60;
        const fechamento = diaSemana === 6 ? 14 * 60 : 18 * 60;
        const horarioFechamento = diaSemana === 6 ? '14:00' : '18:00';

        if (minutos < abertura || minutos > fechamento) {
          erros.push(`Horário fora do funcionamento. Atendemos das 09:00 às ${horarioFechamento}`);
        }
      }
    }
  }

  return erros;
}

module.exports = validarAgendamento;
