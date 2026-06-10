// cypress.config.js
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // Vite dev server (frontend)
    video: true,                       // grava vídeos (evidência extra)
    screenshotOnRunFailure: true,      // screenshot automático em falha
    screenshotsFolder: "cypress/screenshots",
    videosFolder: "cypress/videos",
    setupNodeEvents(on, config) {
      // se no futuro quiser cy.task para limpar DB, usa aqui
      return config;
    },
  },
});
