const fs = require("fs");
const usedAccounts = require("../data/usedAccounts.json");

async function skipFollower(follower,accountsData) {
  let followers = [];
  followers = accountsData;

  usedAccounts.followers.push(follower);
  await fs.promises.writeFile(
    "./data/usedAccounts.json",
    JSON.stringify(usedAccounts, null, 2)
  );

  followers = followers.filter((account) => account.pk !== follower.pk);
  await fs.promises.writeFile(
    "./data/accounts.json",
    JSON.stringify(followers, null, 2)
  );
  return followers
}

module.exports = { skipFollower };
