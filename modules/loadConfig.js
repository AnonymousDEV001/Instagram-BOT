const fs = require('fs').promises;

async function loadConfig() {
    try {
      const configData = await fs.readFile('./config.json', 'utf-8');
      return JSON.parse(configData);
    } catch (error) {
      console.error('Error reading config file:', error.message);
      process.exit(1);
    }
  }

module.exports = { loadConfig };


