import { NextResponse } from "next/server"
import { TwitterApi } from "twitter-api-v2"

// process.env.TWITTER_KEY
// process.env.TWITTER_SECRET

type PostData = {
	post: string
}

export async function POST(request: Request) {
	const req: PostData = await request.json()
	// req.post to get the post
	// use twitter api to upload post

	//initialize client
	const twitterClient = new TwitterApi({
		appKey: process.env.TWITTER_KEY!,
		appSecret: process.env.TWITTER_SECRET!,
		accessToken: process.env.ACCESS_TOKEN!,
		accessSecret: process.env.ACCESS_SECRET!,
	})

	//upload the post to make the tweet
	const res = await twitterClient.v2.tweet(req.post)

	console.log(res)
	return NextResponse.json({
		text: "successful",
	})
}

export async function GET(request: Request){
	const req: GetData = await request.json()

	 const client = new TwitterApi({
		appKey: process.env.TWITTER_KEY!,
		appSecret:process.env.TWITTER_SECRET!,
		accessToken:process.env.ACCESS_TOKEN!,
		accessSecret:process.env.ACCESS_SECRET!,
	});
	 
	const tweet_id = "1647226794104242177"; // replace with your tweet ID

	// Make a GET request to the Twitter API to retrieve tweet engagement metrics
	client.get('statuses/show', { id: tweet_id, tweet_mode: 'extended' }, (error, tweet, response) => {
		if (error) {
			console.error(error);
		} else {
			// Extract engagement metrics from the tweet object
			const favorites = tweet.favorite_count;
			const retweets = tweet.retweet_count;
			const replies = tweet.reply_count;
			
			// Log the metrics to the console
			console.log(`Favorites: ${favorites}`);
			console.log(`Retweets: ${retweets}`);
			console.log(`Replies: ${replies}`);
		}
});
}