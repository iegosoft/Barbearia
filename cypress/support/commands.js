// cypress/support/commands.js

// Login do administrador (CT06 base)
Cypress.Commands.add("loginAdmin", () => {
  cy.visit("/admin/login");
  cy.get('input[name="usuario"]').clear().type("admin"); // ajuste se o name for outro
  cy.get('input[name="senha"]').clear().type("1234");
  cy.get('button[type="submit"], button:contains("Entrar")').first().click();
  cy.url().should("include", "/admin/painel");
});

// Cria agendamento pela interface (usado em vários CTs)
Cypress.Commands.add("criarAgendamentoUI", (dados) => {
  cy.visit("/");
  cy.get('input[name="nome"]').clear().type(dados.nome);
  cy.get('input[name="telefone"]').clear().type(dados.telefone);
  cy.get('input[name="data"]').clear().type(dados.data); // input type="date" → AAAA-MM-DD
  cy.get('input[name="hora"]').clear().type(dados.hora); // input type="time"
  cy.get('select[name="servico"]').select(dados.servico); // value do <option>
  cy.get('button[type="submit"], button:contains("Agendar")').first().click();
});

// Encontra linha da tabela de agendamentos pelo nome do cliente
Cypress.Commands.add("linhaAgendamentoPorNome", (nome) => {
  return cy.contains("table tr", nome);
});
