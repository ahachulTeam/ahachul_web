const base = require("./jest.config.base");

module.exports = {
  ...base,
  projects: ["<rootDir>/apps/*/jest.config.js"],
};
