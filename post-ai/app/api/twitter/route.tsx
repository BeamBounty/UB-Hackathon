import { NextResponse } from "next/server";
import { TwitterApi } from "twitter-api-v2";
import * as dotenv from "dotenv";

dotenv.config();

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
	await twitterClient.v1.tweet(req.post);

	return NextResponse.json({
		// text: "Will post tweet",
		tweet: req.post,
	})
}
