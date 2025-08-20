describe('Visualizar Valores dos Serviços', () => {
  it('Deve exibir corretamente os valores dos serviços', () => {
    cy.visit('http://localhost:3000');

    cy.get('.servicos-lista').within(() => {
      cy.contains('Corte').should('exist');
      cy.contains('R$30').should('exist');

      cy.contains('Barba').should('exist');
      cy.contains('R$20').should('exist');

      cy.contains('Corte + Barba').should('exist');
      cy.contains('R$45').should('exist');
    });
  });
});
