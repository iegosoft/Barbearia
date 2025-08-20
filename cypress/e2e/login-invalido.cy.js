describe('Login do Administrador - Senha Incorreta', () => {
  it('Deve exibir erro ao inserir senha errada', () => {
    cy.visit('http://localhost:3000/admin/login');

    cy.get('input[name="usuario"]').type('admin');
    cy.get('input[name="senha"]').type('senhaErrada');
    cy.get('form').submit();

    cy.contains('Senha incorreta').should('exist');
  });
});
