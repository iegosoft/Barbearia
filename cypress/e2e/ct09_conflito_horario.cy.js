describe("CT09 - Impedir agendamento em horário já ocupado", () => {
  beforeEach(() => {
    cy.criarAgendamentoUI({
      nome: "IEGO BASE",
      telefone: "92999999999",
      data: "2026-07-06",
      hora: "15:00",
      servico: "Barba",
    });

    cy.contains("Agendamento realizado com sucesso").should("be.visible");
  });

  it("CT09.01 - Agendamento base em horário livre", () => {
    cy.loginAdmin();
    cy.linhaAgendamentoPorNome("IEGO BASE").should("exist");
  });

  it("CT09.02 - Tentar agendar em horário ocupado (cliente diferente)", () => {
    cy.criarAgendamentoUI({
      nome: "Maria Souza",
      telefone: "988887777",
      data: "2026-07-06",
      hora: "15:00",
      servico: "Corte",
    });

    cy.contains(/Horário indisponível|já existe agendamento/i).should(
      "be.visible"
    );

    cy.loginAdmin();
    cy.linhaAgendamentoPorNome("Maria Souza").should("not.exist");
  });

  it("CT09.03 - Duplicidade de agendamento do mesmo cliente", () => {
    cy.criarAgendamentoUI({
      nome: "IEGO BASE",
      telefone: "92999999999",
      data: "2026-07-06",
      hora: "15:00",
      servico: "Corte",
    });

    cy.contains(/Horário indisponível|já existe agendamento/i).should(
      "be.visible"
    );

    cy.loginAdmin();
    cy.linhaAgendamentoPorNome("IEGO BASE").then(($linhas) => {
      // garante que só tem 1 linha para ele
      expect($linhas.length).to.eq(1);
    });
  });

  it("CT09.04 - Agendar em outro horário no mesmo dia (sem conflito)", () => {
    cy.criarAgendamentoUI({
      nome: "Cliente Outro Horário",
      telefone: "92911113333",
      data: "2026-07-06",
      hora: "16:00",
      servico: "Corte",
    });

    cy.contains("Agendamento realizado com sucesso").should("be.visible");

    cy.loginAdmin();
    cy.linhaAgendamentoPorNome("Cliente Outro Horário").within(() => {
      cy.contains("16:00");
    });
  });
});


//o teste apresentou falhas críticas que precisam passar por revisão urgente.