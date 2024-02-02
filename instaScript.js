//Imports
const fs = require("fs");
const { IgApiClient } = require("instagram-private-api");
const { loadConfig } = require("./modules/loadConfig");
const { likePost } = require("./modules/instagramActions");
const { Login } = require("./modules/Login");
const { fetchingFollowers } = require("./modules/fetchingFollowers");
const { skipFollower } = require("./modules/skipFollower");
const { gettingPost } = require("./modules/gettingPost");
const usedAccounts = require("./data/usedAccounts.json");

async function main() {
  //Initilizing Instagram and loading ConfigFile
  const ig = new IgApiClient();
  const config = await loadConfig();

  //Trying to use an existing session if possible otherwise create a new session
  await Login(ig);

  let followers = [];

  //Searching for targeted user
  const targetUser = await ig.user.searchExact(config.targetUsername);
  const randomDelay = Math.floor(Math.random() * (120000 - 60000 + 1)) + 60000;

  // //Fetching Followers
  followers = await fetchingFollowers(ig, targetUser);

  // //Looping through the fetched users and liking their post
  for (const follower of followers) {
    // await ig.friendship.create(follower.pk);
    // console.log(
    //   `Followed ${follower.username}`
    // );

    // await new Promise(resolve => setTimeout(resolve, randomDelay));
    //Skipping if private account
    if (follower.is_private) {
      followers = await skipFollower(follower, followers);
      // console.log(`Skipped private account: ${follower.username}`);
      continue;
    }

    // Like the first post of each account
    let firstPost = await gettingPost(ig, follower, followers);
    if (firstPost.length <= 0) {
      followers = followers.filter((account) => account.pk !== follower.pk);
      continue;
    }
    const mediaId = firstPost[0].id;
    await likePost(ig, mediaId, targetUser);
    
    // Save the account info to usedAccounts.json
    followers = await skipFollower(follower, followers);

    console.log(
      `Liked the first post of ${follower.username} and saved their info`
    );
    // await new Promise(resolve => setTimeout(resolve, randomDelay));
  }
}

main();
