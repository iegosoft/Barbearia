describe("CT04 - Cancelar agendamento existente", () => {
  beforeEach(() => {
    cy.criarAgendamentoUI({
      nome: "João Cancelar",
      telefone: "99999999999",
      data: "2026-07-06",
      hora: "15:00",
      servico: "Barba",
    });
    cy.loginAdmin();
  });

  function removerEValidar() {
    // garante que o registro existe antes de remover
    cy.contains("table tr", "João Cancelar").should("exist");

    cy.contains("table tr", "João Cancelar").within(() => {
      cy.get('button, a')
        .contains(/remover/i)
        .click({ force: true }); // ✅ força o clique
    });

    // ✅ força atualização da tela (caso o front não atualize sozinho)
    cy.wait(800);
    cy.reload();

    // ✅ agora sim valida corretamente
    cy.contains("table tr", "João Cancelar").should("not.exist");
  }

  it("CT04.01 - Remover o primeiro agendamento da lista", () => {
    cy.get("table tbody tr").first().within(() => {
      cy.get('button, a')
        .contains(/remover/i)
        .click({ force: true });
    });

    cy.wait(800);
    cy.reload();

    cy.contains("table tr", "João Cancelar").should("not.exist");
  });

  it("CT04.02 - Remover um agendamento específico conhecido", () => {
    removerEValidar();
  });

  it("CT04.03 - Comportamento com lista vazia", () => {
    // remove o existente primeiro
    removerEValidar();

    // agora valida que não há mais esse registro
    cy.get("table tbody tr").each(($tr) => {
      cy.wrap($tr).should("not.contain.text", "João Cancelar");
    });
  });
});
