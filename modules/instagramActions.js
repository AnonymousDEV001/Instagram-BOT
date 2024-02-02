const fs = require('fs').promises;

async function likePost(ig, mediaId, targetUser) {
    try {
      await ig.media.like({
        mediaId: mediaId,
        moduleInfo: {
          module_name: "profile",
          user_id: targetUser.pk,
          username: targetUser.username,
        },
        d: {
          mediaId: mediaId,
        },
      });
    } catch (error) {
      console.error(`Error liking post with mediaId ${mediaId}:`, error.message);
    }
  }

module.exports = { likePost };


