"use client"
import { useState, useRef } from "react"
import { SiOpenai } from "react-icons/si"
import { CiImageOn, CiCircleList } from "react-icons/ci"
import { MdOutlineGifBox } from "react-icons/md"
import { BsEmojiSmile } from "react-icons/bs"
import { TbCalendarTime } from "react-icons/tb"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { AiOutlineSend } from "react-icons/ai"

export default function Home() {
	const nameRef = useRef<HTMLInputElement>(null)
	const bioRef = useRef<HTMLTextAreaElement>(null)
	const contextRef = useRef<HTMLTextAreaElement>(null)
	const toneRef = useRef<HTMLSelectElement>(null)
	const demoRef = useRef<HTMLSelectElement>(null)
	const [post, setPost] = useState("")

	type GPT = {
		text: string
		prompt: string
	}

	type Twitter = {
		text: string
		tweet: string
	}

	const generatePost = async () => {
		const req = await fetch("/api/openai", {
			method: "POST",
			body: JSON.stringify({
				name: nameRef.current?.value,
				bio: bioRef.current?.value,
				context: contextRef?.current?.value,
				tone: toneRef?.current?.value,
				target_demo: demoRef?.current?.value,
			}),
		})
		const gpt_post: GPT = await req.json()
		console.log(gpt_post.prompt)
		setPost(gpt_post.text)
	}

	const sendPost = async () => {
		const req = await fetch("/api/twitter", {
			method: "POST",
			body: JSON.stringify({
				post: post,
			}),
		})

		const twitter_res: Twitter = await req.json()
		console.log(twitter_res.tweet)
		setPost(twitter_res.text)
	}

	return (
		<main className='flex flex-col items-center justify-between min-h-screen p-24'>
			<div className='z-10 grid items-center justify-between w-full max-w-5xl grid-cols-1 mx-10 font-mono text-lg'>
				<div className='uppercase'>Name</div>
				<div className='bg-white text-black rounded-md w-[70%] p-4 my-4'>
					<input
						type='text'
						ref={nameRef}
						placeholder='Enter Company Name'
						className='w-full'
					/>
				</div>

				<div className='uppercase'>Bio</div>
				<div className='bg-white text-black rounded-md  w-[70%] p-4 my-4'>
					<textarea
						ref={bioRef}
						placeholder='Enter Company Bio'
						className='w-full'
					/>
				</div>

				<div className='uppercase'>Context</div>
				<div className='rounded-md ring-1 ring-white w-[70%] p-4 my-4'>
					<div className='w-full p-4 mb-4 text-black bg-white rounded-md'>
						<textarea
							ref={contextRef}
							placeholder='Enter Post Context'
							className='w-full'
						/>
					</div>

					<div className='flex justify-between w-full'>
						<div>
							Tone:
							<select
								name='tone'
								ref={toneRef}
								className='pr-4 ml-2 text-black rounded-md'
							>
								<option>Funny</option>
								<option>Informative</option>
								<option>Motivational</option>
								<option>Sarcastic</option>
								<option>Serious</option>
								<option>Silly</option>
							</select>
						</div>
						<div>
							Target Demographic:
							<select
								name='target-demo'
								ref={demoRef}
								className='pr-4 ml-2 text-black rounded-md'
							>
								<option>Adults</option>
								<option>Athletes</option>
								<option>College Students</option>
								<option>Gamers</option>
								<option>High School</option>
								<option>Men</option>
								<option>Parents</option>
								<option>Women</option>
							</select>
						</div>
					</div>
				</div>

				<div className='flex w-[70%] justify-between'>
					<div className='uppercase'>Post</div>
					<div
						onClick={generatePost}
						className='flex justify-end pl-2 rounded-md hover:cursor-pointer hover:bg-white hover:text-black ring-1 ring-white'
					>
						ChatGPT
						<SiOpenai className='mx-2 my-1' />
					</div>
				</div>
				<div className='bg-white text-black rounded-md  w-[70%] p-4 my-4'>
					<textarea
						placeholder='Enter Post'
						className='w-full'
						value={post}
						onChange={event => {
							setPost(event.target.value)
						}}
					/>
				</div>
				<div className='flex w-[70%] justify-between'>
					<ul className='flex gap-8 mx-2 text-2xl'>
						<li>
							<CiImageOn />
						</li>
						<li>
							<MdOutlineGifBox />
						</li>
						<li>
							<CiCircleList />
						</li>
						<li>
							<BsEmojiSmile />
						</li>
						<li>
							<TbCalendarTime />
						</li>
						<li>
							<HiOutlineLocationMarker />
						</li>
					</ul>
					<div
						onClick={sendPost}
						className='flex justify-end pl-2 rounded-md hover:cursor-pointer hover:bg-white hover:text-black ring-1 ring-white'
					>
						Tweet
						<AiOutlineSend className='mx-2 my-1' />
					</div>
				</div>
			</div>
		</main>
	)
}
