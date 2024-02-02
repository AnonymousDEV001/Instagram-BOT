const fs = require('fs').promises;
const { saveSession, loadSession } = require("./session");
const { loadConfig } = require("./loadConfig");

async function Login(ig) {
    const config = await loadConfig();
    if (await loadSession(ig, "./data/sessionInfo.json")) {
        console.log("Session loaded. Skipping login.");
      } else {
        ig.state.generateDevice(config.username);
        const loggedInUser = await ig.account.login(
          config.username,
          config.password
        );
        console.log("Logged in as:", loggedInUser.username);
        await saveSession(ig, "./data/sessionInfo.json");
      }
  }

module.exports = { Login };
