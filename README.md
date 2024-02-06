# Inspiration

The theme of this Hackathon was to use ChatGPT to help build our project. What better way to get started than to have ChatGPT generate project ideas for us? It gave us a number of good ideas to consider, but we ultimately chose this one for its relative simplicity and potential real-world applications.

# What it does

PostAI will use ChatGPT to engineer Twitter posts tailored towards a company's desired audience. After inputting the company's name, target demographic, and various other options, ChatGPT will generate Tweets which the user can edit and post directly to Twitter.

![ChatGPT generated tweet based on inputted data](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/455/873/datas/gallery.jpg)

![Twitter post](https://d112y698adiu2z.cloudfront.net/photos/production/software_photos/002/455/874/datas/gallery.jpg)

# How we built it

We used Typescript and Nextjs, a React framework, to build the site and make API calls to both Twitter and ChatGPT. We use the data that the user provides to generate a prompt which we then send to ChatGPT via the OpenAI API. The API will send a response back with the sample Tweet which we then display to the user. The user may then edit or regenerate the tweet. Once the user is satisfied, we use the Twitter API to post the tweet.

# Challenges we ran into

We ran into a variety of challenges during this project. The most notable one we faced was having ChatGPT generate code for us. We attempted to have it generate code to handle the API requests, but it took numerous attempts and prompts to have it give us something functional. For example, sometimes ChatGPT would generate code in a different language from what we needed (Python instead of TypeScript).

# Accomplishments that we're proud of

We are extremely proud of the fact that it works exactly as we envisioned. When we began building, we were skeptical that we would be able to get ChatGPT to work properly and generate the types of responses we needed for this project. However, by the end, our finished application surpassed our expectations.

# What we learned

None of us had any real experience making web apps or using APIs, so we learned a lot about React and using APIs to send data. It also gave us experience with reading documentation to understand how a particular API works, which is an essential software engineering skill to have.

# What's next for PostAI

Currently, what we have built is a very basic prototype. We envision a future where a company could register an account with PostAI, and it will automatically generate, schedule, and post to Twitter, Facebook, and other linked platforms with little to no input from user. They would be able to log in, view various analytics and adjust posting parameters accordingly.
