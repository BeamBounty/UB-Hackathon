"use client"
import { useState, useRef, useEffect } from "react"
import { SiOpenai } from "react-icons/si"
import { CiImageOn, CiCircleList } from "react-icons/ci"
import { MdOutlineGifBox } from "react-icons/md"
import { BsEmojiSmile } from "react-icons/bs"
import { TbCalendarTime } from "react-icons/tb"
import { HiOutlineLocationMarker } from "react-icons/hi"
import { AiOutlineSend } from "react-icons/ai"
import { BiLeftArrow, BiRightArrow } from "react-icons/bi"

export default function Home() {
	const nameRef = useRef<HTMLInputElement>(null)
	const bioRef = useRef<HTMLTextAreaElement>(null)
	const contextRef = useRef<HTMLTextAreaElement>(null)
	const postRef = useRef<HTMLTextAreaElement>(null)
	const toneRef = useRef<HTMLSelectElement>(null)
	const demoRef = useRef<HTMLSelectElement>(null)
	const [post, setPost] = useState<string[]>([])
	const [currPost, setCurrPost] = useState("")
	const [loading, setLoading] = useState(false)
	const [index, setIndex] = useState(0)

	const [postSize, setPostSize] = useState("75px")

	type GPT = {
		text: string
		prompt: string
	}

	useEffect(() => {
		setIndex(post.length - 1)
	}, [post.length])

	useEffect(() => {
		setCurrPost(post[index])
	}, [index])

	useEffect(() => {
		post.length == 0 && currPost
			? setPost([currPost])
			: setPost(previous =>
					previous.map((p, idx) => {
						if (idx == index) {
							return currPost
						}
						return p
					})
			  )
	}, [currPost])

	useEffect(() => {
		setPostSize(() => `${postRef.current?.scrollHeight}px`)
	}, [postRef.current?.value])

	const generatePost = async () => {
		setLoading(true)
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
		setPost(previous => [...previous, gpt_post.text])
		setLoading(false)
	}

	const sendPost = async () => {
		setLoading(true)
		const req = await fetch("/api/twitter", {
			method: "POST",
			body: JSON.stringify({
				post: post,
			}),
		})
		setLoading(false)
	}

	return (
		<main className='flex flex-col items-center justify-between min-h-screen p-24'>
			<div className='z-10 grid items-center justify-between w-full md:max-w-[35%] md:min-w-max grid-cols-1 mx-10 font-mono text-lg'>
				<h1 className='pb-4 text-4xl text-center'>PostAI</h1>
				<div className='uppercase'>Name</div>
				<div className='w-full p-4 my-4 text-black bg-white rounded-md'>
					<input
						type='text'
						ref={nameRef}
						placeholder='Enter Company Name'
						className='w-full'
					/>
				</div>

				<div className='uppercase'>Bio</div>
				<div className='w-full p-4 my-4 text-black bg-white rounded-md'>
					<textarea
						ref={bioRef}
						placeholder='Enter Company Bio'
						className='w-full'
						onChange={event => {
							event.target.style.height = `${event.target.scrollHeight}px`
						}}
					/>
				</div>

				<div className='uppercase'>Context</div>
				<div className='w-full p-4 my-4 rounded-md ring-1 ring-white'>
					<div className='w-full p-4 mb-4 text-black bg-white rounded-md'>
						<textarea
							ref={contextRef}
							placeholder='Enter Post Context'
							className='w-full'
							onChange={event => {
								event.target.style.height = `${event.target.scrollHeight}px`
							}}
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
								<option>Aggressive</option>
								<option>Apologetic</option>
								<option>Controversial</option>
								<option>Conspiratorial</option>
								<option>Emotional</option>
								<option>Informative</option>
								<option>Motivational</option>
								<option>Sarcastic</option>
								<option>Serious</option>
								<option>Silly</option>
								<option>Skeptical</option>
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
								<option>Everyone</option>
								<option>Fitness</option>
								<option>Gamers</option>
								<option>High School</option>
								<option>LGBTQ</option>
								<option>Men</option>
								<option>Parents</option>
								<option>Women</option>
							</select>
						</div>
					</div>
				</div>

				<div className='flex justify-between w-full'>
					<div className='uppercase'>Post</div>
					<div className={post.length == 0 ? "hidden" : ""}>
						{index + 1} of {post.length}
					</div>
					<div
						onClick={generatePost}
						className='flex justify-end pl-2 rounded-md hover:cursor-pointer hover:bg-white hover:text-black ring-1 ring-white'
					>
						ChatGPT
						<SiOpenai className='mx-2 my-1' />
					</div>
				</div>
				<div
					className={
						"bg-white text-black rounded-md  w-full p-4 my-4" +
						(loading ? "bg-gray-200 animate-pulse my-4" : "")
					}
				>
					<textarea
						placeholder='Enter Post'
						className='w-full'
						value={loading ? " " : currPost}
						disabled={loading}
						ref={postRef}
						onChange={event => {
							setCurrPost(event.target.value)
						}}
						style={{ height: postSize }}
					/>
				</div>
				<div className='flex justify-between w-full'>
					<ul className='flex gap-8 mx-2 text-2xl select-none'>
						<li>
							<BiLeftArrow
								className='cursor-pointer'
								onClick={() =>
									setIndex(PreviousIndex =>
										PreviousIndex == 0
											? 0
											: PreviousIndex - 1
									)
								}
							/>
						</li>
						<li>
							<BiRightArrow
								className='cursor-pointer'
								onClick={() =>
									setIndex(PreviousIndex =>
										PreviousIndex == post.length - 1
											? PreviousIndex
											: PreviousIndex + 1
									)
								}
							/>
						</li>
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
