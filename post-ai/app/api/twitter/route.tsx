import { NextResponse } from "next/server"

// process.env.TWITTER_KEY
// process.env.TWITTER_SECRET

type PostData = {
	post: string
}

export async function POST(request: Request) {
	const req: PostData = await request.json()
	// req.post to get the post
	// use twitter api to upload post

	return NextResponse.json({
		text: "Will post tweet",
		tweet: req.post,
	})
}
