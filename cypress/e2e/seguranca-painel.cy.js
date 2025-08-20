describe('Segurança - Acesso ao Painel Sem Login', () => {
  it('Não deve permitir acesso ao painel sem estar autenticado', () => {
    cy.visit('http://localhost:3000/admin/painel');

    // Como o usuário não está logado, deve ser redirecionado para /admin/login
    cy.url().should('include', '/admin/login');
    cy.contains('Login BarberShop').should('exist');
  });
});
