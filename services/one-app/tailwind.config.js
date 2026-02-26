const path = require('path');
const loadConfig = require('tailwindcss/loadConfig');

module.exports = loadConfig(path.join(__dirname, 'tailwind.config.ts'));
