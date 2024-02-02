const fs = require("fs").promises

async function gettingPost(ig, follower,accountsData) {
    try {
        let followers = [];
        followers = accountsData;
        const userFeed = ig.feed.user(follower.pk);
        const firstPost = await userFeed.items();
      
        if (firstPost.length <= 0) {
          console.log(`No posts found for ${follower.username}`);
          followers = followers.filter((account) => account.pk !== follower.pk);
          await fs.writeFile("./data/accounts.json", JSON.stringify(followers, null, 2));
        }
        return firstPost
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = { gettingPost };
