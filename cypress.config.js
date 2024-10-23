const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost',
    env: {
      hideCredentials: true, // Segurança para o token de acesso do usuário
      requestMode: true,
    },
    experimentalRunAllSpecs: true, // Funcionalidade para executar os testes de modo interativo: em uma única instância do navegador
  },
  fixturesFolder: false,
  video: false,
})