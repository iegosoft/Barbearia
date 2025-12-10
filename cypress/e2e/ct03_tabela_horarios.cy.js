describe("CT03 - Exibição da tabela de horários na página inicial", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("CT03.01 - Seção de horários visível", () => {
    cy.contains(/horários/i).should("be.visible");
  });

  it("CT03.02 - Todos os dias úteis presentes", () => {
    ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"].forEach((dia) => {
      cy.contains(dia).should("exist");
    });
  });

  it("CT03.03 - Sábado com horário especial", () => {
    cy.contains("Sábado")
      .parent()
      .within(() => {
        cy.contains("09:00").should("exist");
        cy.contains("14:00").should("exist");
      });
  });

  it("CT03.04 - Domingo com indicação de 'Fechado'", () => {
    cy.contains("Domingo")
      .parent()
      .within(() => {
        cy.contains(/Fechado/i).should("exist");
      });
  });
});
