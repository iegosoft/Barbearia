describe("CT02 - Validação de campos obrigatórios no agendamento", () => {
  // todos os casos de testes serão executados de forma automática via cypress, e as evidencias etsrão nas pastas /screenshots e /videos não serão configurados logs para evidencias 
  it("CT02.01 - Nome obrigatório (nome vazio)", () => {
    cy.visit("/");
    cy.get('input[name="telefone"]').type("99999999999");
    cy.get('input[name="data"]').type("2026-07-06");
    cy.get('input[name="hora"]').type("16:00");
    cy.get('select[name="servico"]').select("Corte");
    cy.get('button[type="submit"], button:contains("Agendar")').first().click();

    // ✅ Validação correta: NÃO pode existir no painel
    cy.loginAdmin();
    cy.contains("table tr", "Cliente Sem Nome").should("not.exist");
  });

  it("CT02.02 - Telefone obrigatório (telefone vazio)", () => {
    cy.visit("/");
    cy.get('input[name="nome"]').type("Cliente Sem Telefone");
    cy.get('input[name="data"]').type("2026-07-07");
    cy.get('input[name="hora"]').type("10:00");
    cy.get('select[name="servico"]').select("Barba");
    cy.get('button[type="submit"], button:contains("Agendar")').first().click();

    // ✅ Validação correta: NÃO pode existir no painel
    cy.loginAdmin();
    cy.contains("table tr", "Cliente Sem Telefone").should("not.exist");
  });

  it("CT02.03 - Data obrigatória (data vazia)", () => {
    cy.visit("/");
    cy.get('input[name="nome"]').type("Cliente Sem Data");
    cy.get('input[name="telefone"]').type("92911112222");
    cy.get('input[name="hora"]').type("11:00");
    cy.get('select[name="servico"]').select("Corte");
    cy.get('button[type="submit"], button:contains("Agendar")').first().click();

    // ✅ Validação correta: NÃO pode existir no painel
    cy.loginAdmin();
    cy.contains("table tr", "Cliente Sem Data").should("not.exist");
  });

  it("CT02.04 - Todos os campos obrigatórios preenchidos (classe válida de controle)", () => {
    cy.criarAgendamentoUI({
      nome: "Campos OK",
      telefone: "92944445555",
      data: "2026-07-09",
      hora: "09:00",
      servico: "Corte",
    });

    cy.contains("Agendamento realizado com sucesso").should("be.visible");

    cy.loginAdmin();
    cy.linhaAgendamentoPorNome("Campos OK").within(() => {
      cy.contains("09:00");
    });
  });
});
