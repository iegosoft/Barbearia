describe('Login do Administrador - Acesso ao Painel', () => {
  it('Deve acessar o painel após login válido', () => {
    cy.visit('http://localhost:3000/admin/login');

    cy.get('input[name="usuario"]').type('admin');
    cy.get('input[name="senha"]').type('1234');
    cy.get('form').submit();

    cy.url().should('include', '/admin/painel');
    cy.contains('Painel de Agendamentos').should('exist');
  });
});
