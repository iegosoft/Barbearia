describe('Logout do Administrador', () => {
  it('Deve deslogar e voltar para a tela de login', () => {
    // Login
    cy.visit('http://localhost:3000/admin/login');
    cy.get('input[name="usuario"]').type('admin');
    cy.get('input[name="senha"]').type('1234');
    cy.get('form').submit();

    // Logout
    cy.get('a[href="/admin/logout"]').click();

    // Deve redirecionar para a tela de login
    cy.url().should('include', '/admin/login');
    cy.contains('Login BarberShop').should('exist');
  });
});
