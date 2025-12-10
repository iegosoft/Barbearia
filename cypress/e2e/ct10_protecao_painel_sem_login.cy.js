describe("CT10 - Proteção da rota do painel sem autenticação", () => {
  
  it("CT10.01 - Acesso direto ao painel sem sessão ativa", () => {
    cy.visit("/admin/painel");

    // ✅ Deve redirecionar para login
    cy.url().should("include", "/admin/login");
    cy.url().should("not.include", "/admin/painel");
  });

  it("CT10.02 - Acesso à rota protegida via link direto sem sessão", () => {
    cy.visit("/");
    cy.visit("/admin/painel");

    // ✅ Deve continuar bloqueado
    cy.url().should("include", "/admin/login");
  });

  it("CT10.03 - Acesso ao painel após autenticação válida", () => {
    cy.visit("/admin/login");

    cy.get('input[name="usuario"]').type("admin");
    cy.get('input[name="senha"]').type("1234");

    cy.get('button[type="submit"], button:contains("Entrar")')
      .first()
      .click();

    // ✅ Validação correta: acesso liberado ao painel
    cy.url().should("include", "/admin/painel");
    cy.url().should("not.include", "/admin/login");
  });

});
