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
		<main className='flex min-h-screen flex-col items-center justify-between p-24'>
			<div className='z-10 w-full max-w-5xl mx-10 items-center justify-between font-mono text-lg grid grid-cols-1'>
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
				<div className='bg-white text-black rounded-md  w-[70%] p-4 my-4'>
					<textarea
						ref={contextRef}
						placeholder='Enter Post Context'
						className='w-full'
					/>
				</div>

				<div className='flex w-[70%] justify-between'>
					<div className='uppercase'>Post</div>
					<div
						onClick={generatePost}
						className='flex rounded-md justify-end hover:cursor-pointer hover:bg-white hover:text-black ring-1 ring-white pl-2'
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
						className='flex rounded-md justify-end hover:cursor-pointer hover:bg-white hover:text-black ring-1 ring-white pl-2'
					>
						Tweet
						<AiOutlineSend className='mx-2 my-1' />
					</div>
				</div>
			</div>
		</main>
	)
}
