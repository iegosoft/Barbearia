describe("CT08 - Logout do administrador", () => {
  beforeEach(() => {
    // garante que o admin está logado
    cy.visit("/admin/login");

    cy.get('input[name="usuario"]').type("admin");
    cy.get('input[name="senha"]').type("1234");

    cy.get('button[type="submit"], button:contains("Entrar")')
      .first()
      .click();

    cy.url().should("include", "/admin/painel");
  });

  it("CT08.01 - Logout seguido de tentativa de acesso direto ao painel", () => {
    // ✅ Faz logout pela rota
    cy.visit("/admin/logout");

    // ✅ Deve voltar ao login
    cy.url().should("include", "/admin/login");

    // ✅ Tentativa de acesso direto deve ser bloqueada
    cy.visit("/admin/painel");
    cy.url().should("include", "/admin/login");
  });

  it("CT08.02 - Logout seguido de clique em link interno para o painel", () => {
    cy.visit("/admin/logout");
    cy.url().should("include", "/admin/login");

    // tentativa de acesso interno
    cy.visit("/");
    cy.visit("/admin/painel");

    cy.url().should("include", "/admin/login");
  });

  it("CT08.03 - Logout seguido de recarregamento da página", () => {
    cy.visit("/admin/logout");
    cy.url().should("include", "/admin/login");

    cy.reload();

    // continua bloqueado
    cy.url().should("include", "/admin/login");
  });
});

//foi necessário modificar algumas rotas para que fosse necessario aplicar os testes de forma eficiente.