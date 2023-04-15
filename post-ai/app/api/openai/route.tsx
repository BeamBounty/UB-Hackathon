import { NextResponse } from "next/server"

// process.env.OPENAI_KEY

type GPTData = {
	name: string
	bio: string
	context: string
}

export async function POST(request: Request) {
	const req: GPTData = await request.json()

	const prompt = `Company Name: ${req.name}\nCompany Description: ${req.bio}\nGenerate a tweet for this company with the following context:\n${req.context}`
	// use the openai api to prompt chatgpt for a tweet.
	// feel free to modify the promp if you want.

	const tweet = "Will generate with ChatGPT"
	return NextResponse.json({
		text: tweet,
		prompt: prompt,
	})
}
