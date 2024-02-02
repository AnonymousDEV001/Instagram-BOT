const fs = require('fs').promises;

async function saveFollowersToFile(followers, accountsFile) {
    try {
      // Save followers to file
      await fs.writeFile(accountsFile, JSON.stringify(followers, null, 2));
      console.log("Followers saved to", accountsFile);
    } catch (error) {
      console.error("Error saving followers to file:", error.message);
    }
  }

module.exports = { saveFollowersToFile };
