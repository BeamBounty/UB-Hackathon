import { NextResponse } from "next/server"
import { Configuration, OpenAIApi } from "openai"
// process.env.OPENAI_KEY

type GPTData = {
	name: string
	bio: string
	context: string
	tone: string
	target_demo: string
}

export async function POST(request: Request) {
	const req: GPTData = await request.json()
	const prompt = `Company Name: ${req.name}\nCompany Description: ${req.bio}\nGenerate a ${req.tone} tweet geared towards ${req.target_demo} for this company with the following context:\n${req.context}`

	//Configure a new OpenAI completion request
	const configuration = new Configuration({
		apiKey: process.env.OPENAI_KEY,
	})

	const openai = new OpenAIApi(configuration)

	const model_engine = "text-davinci-003"
	const response = await openai.createCompletion({
		model: model_engine,
		prompt: prompt,
		max_tokens: 64, // Length of response
		n: 1, // Number of responses
		stop: null, // Can set a certain string of chars where, if reached, prompt will stop
		temperature: 1, // How risky will the answers be
	})
	const data = response.data
	const tweet = data.choices[0]

	return NextResponse.json({
		text: tweet.text?.trim(),
		prompt: prompt,
	})
}
