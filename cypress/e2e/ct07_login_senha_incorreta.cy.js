describe("CT07 - Login com senha incorreta", () => {
  it("CT07.01 - Usuário válido, senha incorreta", () => {
    cy.visit("/admin/login");

    cy.get('input[name="usuario"]').type("admin");
    cy.get('input[name="senha"]').type("0000");

    cy.get('button[type="submit"], button:contains("Entrar")')
      .first()
      .click();

    // ✅ Validação correta: NÃO pode ir para o painel
    cy.url().should("include", "/admin/login");
    cy.url().should("not.include", "/admin/painel");
  });

  it("CT07.02 - Tentativas repetidas com senha incorreta", () => {
    for (let i = 0; i < 3; i++) {
      cy.visit("/admin/login");

      cy.get('input[name="usuario"]').type("admin");
      cy.get('input[name="senha"]').type("0000");

      cy.get('button[type="submit"], button:contains("Entrar")')
        .first()
        .click();

      // ✅ Continua bloqueado
      cy.url().should("include", "/admin/login");
      cy.url().should("not.include", "/admin/painel");
    }
  });
});
//nesse caso de teste também foi necessário modificar alguns objetos que fosse necessário aplicar os testes de forma eficiente.