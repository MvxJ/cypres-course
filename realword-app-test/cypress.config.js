const { defineConfig } = require("cypress");

module.exports = defineConfig({
  viewportHeight: 1080,
  viewportWidth: 1920,
  video: true,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json'
  },
  env: {
    password: "Qwertyuiop",
    apiUrl: "https://conduit-api.bondaracademy.com/api"
  },
  retries: {
    runMode: 2,
    openMode: 0
  },
  e2e: {
    setupNodeEvents(on, config) {
      // const username = process.env.DB_USERNAME;
      // const password = process.env.PASSWORD;
      //
      // if (!password) {
      //   throw new Error('Missing password environment variable');
      // }
      //
      // config.env = {username, password}
      //
      // return config;
    },
    baseUrl: 'https://conduit.bondaracademy.com',
    specPattern: 'cypress/e2e/**/*.spec.{js,jsx,ts,tsx}'
  },
});
