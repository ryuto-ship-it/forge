require('dotenv').config();
const { TwitterApi } = require('twitter-api-v2');

// Initialize the Twitter client with the provided credentials
const client = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

async function postTestTweet() {
  try {
    const ticker = "TEST";
    const tokenName = "Test Protocol";
    const link = "https://ryuto-ship-it.github.io/forge/";
    
    const tweetText = `🚀 New token launched on Forge!\n$${ticker} - ${tokenName}\nTrade now: ${link}\n#Base #Crypto`;
    
    console.log("Attempting to post tweet using v1.1 endpoint:\n", tweetText);
    
    // Attempt using v1.1 endpoint which some legacy tokens require
    const response = await client.v1.tweet(tweetText);
    
    console.log("\n✅ Success! Tweet posted.");
    console.log("Tweet ID:", response.id_str);
    console.log("URL: https://twitter.com/user/status/" + response.id_str);
  } catch (error) {
    console.error("\n❌ Error posting tweet:");
    if (error.response && error.response.data) {
      console.error(error.response.data);
    } else {
      console.error(error);
    }
  }
}

postTestTweet();
