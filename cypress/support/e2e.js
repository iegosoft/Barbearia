// cypress/support/e2e.js
import "./commands";

// screenshot extra ao final de cada teste (mesmo se passar)
afterEach(function () {
  const testTitle = this.currentTest.titlePath().join(" -- ");
  cy.screenshot(testTitle, { capture: "viewport" });
});
