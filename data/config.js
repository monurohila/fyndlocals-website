const fs = require('fs');
const path = require('path');
const configPath = path.join(__dirname, 'config.json');

function getConfig() {
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

function saveConfig(data) {
  fs.writeFileSync(configPath, JSON.stringify(data, null, 2));
}

module.exports = { getConfig, saveConfig };
