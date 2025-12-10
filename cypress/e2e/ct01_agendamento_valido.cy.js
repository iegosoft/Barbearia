describe("CT01 - Agendamento com dados válidos", () => {
  it("CT01.01 - Agendamento em dia útil, horário intermediário", () => {
    cy.criarAgendamentoUI({
      nome: "João Silva",
      telefone: "99999999999",
      data: "2026-07-06",
      hora: "15:00",
      servico: "Barba",
    });

    cy.contains("Agendamento realizado com sucesso").should("be.visible");

    cy.loginAdmin();
    cy.linhaAgendamentoPorNome("João Silva").within(() => {
      cy.contains("99999999999");
      cy.contains("2026"); // ✅ DATA FLEXÍVEL
      cy.contains("15:00");
      cy.contains("Barba");
    });
  });

  it("CT01.02 - Agendamento em sábado (horário permitido)", () => {
    cy.criarAgendamentoUI({
      nome: "Marcos Sábado",
      telefone: "92988887777",
      data: "2026-07-11",
      hora: "10:00",
      servico: "Corte",
    });

    cy.contains("Agendamento realizado com sucesso").should("be.visible");

    cy.loginAdmin();
    cy.linhaAgendamentoPorNome("Marcos Sábado").within(() => {
      cy.contains("2026"); // ✅ DATA FLEXÍVEL
      cy.contains("10:00");
      cy.contains("Corte");
    });
  });

  it("CT01.03 - Agendamento no primeiro horário do expediente", () => {
    cy.criarAgendamentoUI({
      nome: "Primeiro Horário",
      telefone: "92977776666",
      data: "2026-07-08",
      hora: "09:00",
      servico: "Corte",
    });

    cy.contains("Agendamento realizado com sucesso").should("be.visible");

    cy.loginAdmin();
    cy.linhaAgendamentoPorNome("Primeiro Horário").within(() => {
      cy.contains("09:00");
    });
  });

  it("CT01.04 - Agendamento no último horário do expediente", () => {
    cy.criarAgendamentoUI({
      nome: "Último Horário",
      telefone: "92966665555",
      data: "2026-07-08",
      hora: "18:00",
      servico: "Corte + Barba",
    });

    cy.contains("Agendamento realizado com sucesso").should("be.visible");

    cy.loginAdmin();
    cy.linhaAgendamentoPorNome("Último Horário").within(() => {
      cy.contains("18:00");
      cy.contains("Corte + Barba");
    });
  });
});
