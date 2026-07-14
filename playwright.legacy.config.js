const baseConfig = require('./playwright.config');

module.exports = {
  ...baseConfig,
  testDir: './tests',
};
