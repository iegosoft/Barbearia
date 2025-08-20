describe('Remover agendamento existente', () => {
  it('Deve logar e remover o primeiro agendamento da lista', () => {
    // Login
    cy.visit('http://localhost:3000/admin/login');
    cy.get('input[name="usuario"]').type('admin');
    cy.get('input[name="senha"]').type('1234');
    cy.get('form').submit();

    cy.url().should('include', '/admin/painel');

    // Verifica se há agendamento
    cy.get('form[action^="/admin/remover"]').first().submit();

    // Após remover, deve continuar no painel
    cy.url().should('include', '/admin/painel');
  });
});
