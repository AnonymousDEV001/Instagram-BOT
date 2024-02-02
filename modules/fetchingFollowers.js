const accountsData = require("../data/accounts.json");
const currectStateOfFetching = require("../data/currectStateOfFetching.json");
const fs = require('fs').promises;
const { saveFollowersToFile } = require("./savingData");

async function fetchingFollowers(ig, targetUser) {
  const nextMaxId = currectStateOfFetching

  let followers = [];

  if (accountsData.length > 0) {
    return accountsData;
  }
  const followersFeed = ig.feed.accountFollowers(targetUser.pk);

  followersFeed.nextMaxId = nextMaxId.nextMaxId
  followersFeed.moreAvailable = nextMaxId.moreAvailable
  followers = accountsData

  do {
    let data = await followersFeed.items();
    data.forEach((element) => {
      followers.push(element);
    });
    console.log(followers.length)
    await saveFollowersToFile(followers, "./data/accounts.json");
    try {
      // Save followers to file
      await fs.writeFile("./data/currectStateOfFetching.json", JSON.stringify(followersFeed, null, 2));
    } catch (error) {
      console.error("Error saving followers to file:", error.message);
    }
  } while (followersFeed.isMoreAvailable());

  console.log("Fetched new followers");
  return followers;
}

module.exports = { fetchingFollowers };
