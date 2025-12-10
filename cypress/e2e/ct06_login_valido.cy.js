describe("CT06 - Login com credenciais válidas", () => {
  it("CT06.01 - Login com credenciais exatas cadastradas", () => {
    cy.visit("/admin/login");

    cy.get('input[name="usuario"]').type("admin");
    cy.get('input[name="senha"]').type("1234");

    cy.get('button[type="submit"], button:contains("Entrar")')
      .first()
      .click();

    // ✅ Validação correta: pela URL (sessão ativa)
    cy.url().should("include", "/admin/painel");
  });

  it("CT06.02 - Login seguido de recarregamento da página do painel", () => {
    cy.visit("/admin/login");

    cy.get('input[name="usuario"]').clear().type("admin");
    cy.get('input[name="senha"]').clear().type("1234");

    cy.get('button[type="submit"], button:contains("Entrar")')
      .first()
      .click();

    cy.url().should("include", "/admin/painel");

    // ✅ Reload com sessão ativa
    cy.reload();

    // ✅ Sessão ainda válida após reload
    cy.url().should("include", "/admin/painel");
  });
});
