const fs = require('fs').promises;

async function saveSession(ig, sessionFile) {
  // Serialize session
  console.log(sessionFile)
  const serialized = await ig.state.serialize();
  // Save session to file
  await fs.writeFile(sessionFile, JSON.stringify(serialized));
  console.log('Session info saved to', sessionFile);
}

async function loadSession(ig, sessionFile) {
  try {
    // Load session from file
    const serialized = JSON.parse(await fs.readFile(sessionFile, 'utf-8'));
    // Deserialize session
    await ig.state.deserialize(serialized);
    console.log('Session info loaded from', sessionFile);
    return true;
  } catch (error) {
    console.error('Error loading session:', error.message);
    return false;
  }
}

module.exports = { saveSession, loadSession };
