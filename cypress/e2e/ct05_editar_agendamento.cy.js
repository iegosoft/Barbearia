describe("CT05 - Editar horário de um agendamento", () => {
  beforeEach(() => {
    cy.criarAgendamentoUI({
      nome: "João Editar",
      telefone: "99999999999",
      data: "2026-07-06",
      hora: "15:00",
      servico: "Corte",
    });
    cy.loginAdmin();
  });

  function editarHora(novaHora) {
    // garante que o registro existe antes da edição
    cy.contains("table tr", "João Editar").should("exist");

    cy.contains("table tr", "João Editar").within(() => {
      cy.get('button, a')
        .contains(/editar/i)
        .click({ force: true });
    });

    // agora está na tela de edição
    cy.get('input[name="hora"]').clear().type(novaHora);
    cy.get('button[type="submit"], button:contains("Salvar")')
      .first()
      .click({ force: true });

    // força recarregamento do painel para garantir atualização
    cy.wait(800);
    cy.reload();

    // ✅ VALIDAÇÃO REAL: horário foi alterado na tabela
    cy.contains("table tr", "João Editar").within(() => {
      cy.contains(novaHora);
    });
  }

  it("CT05.01 - Editar para outro horário válido e livre", () => {
    editarHora("16:00");
  });

  it("CT05.02 - Editar para o primeiro horário do dia", () => {
    editarHora("09:00");
  });

  it("CT05.03 - Editar para o último horário do dia", () => {
    editarHora("18:00");
  });
});
