describe('Agendamento de Serviço', () => {
  it('Deve agendar com sucesso', () => {
    cy.visit('http://localhost:3000');

    cy.get('input[name="nome"]').type('Maria Teste');
    cy.get('input[name="telefone"]').type('92988887777');
    cy.get('input[name="data"]').type('2025-06-20');
    cy.get('input[name="hora"]').type('10:00');
    cy.get('select[name="servico"]').select('Corte');

    cy.get('form').submit();

    cy.contains('✅ Agendamento realizado com sucesso!').should('exist');
  });
});
