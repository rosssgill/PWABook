# About
This repository contains all the [client](https://github.com/rosssgill/pwabook-client) and [serverside](https://github.com/rosssgill/pwabook-server) code, included as git submodules, for my Final Year Project, PWABook, which is a full stack social media [progressive web application](https://web.dev/what-are-pwas/) built using the [MERN](https://www.mongodb.com/mern-stack) stack. The frontend application is hosted and deployed on Netlify and can be viewed [here](https://pwabook.netlify.app/). The backend express server has been deployed to [Heroku](https://www.heroku.com). Alternatively, you can install and run the application on your own machine with the steps outlined below.

## Features
- Ability to create an account or sign in through [Google Identity Services](https://developers.google.com/identity)
- Ability to make, edit and delete your own posts
- Ability to like others' posts
- Ability to install the application on your mobile device
- Utilises precaching and dynamic caching strategies to show posts even while offline
- If a post is edited, liked or deleted while offline, the api request will be queued and executed on resuming internet connection thanks to Background Sync
- Ability to subscribe to push notifications and get notified everytime a new post is made, even with the app closed


# Steps to install locally
1. Install [Node.js](https://nodejs.org/en/) v18.6. I recommend using [nvm](https://github.com/nvm-sh/nvm) to install and manage your node versions easily.
2. Either clone this parent repository or the client and server applications separately. If you chose to clone the parent repository you may notice that the client and server are initially empty due to being [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules). To fix this, run `git submodule update --init --recursive` inside the root of the directory.
3. Navigate into the server directory and run `npm install`.
4. Create a new file called .env and fill it out with your desired environment variables, similar to [.env.example](https://github.com/rosssgill/pwabook-server/blob/master/.env.example). Here you can figure the port which the server runs on and also provide a connection url for your [mongodb cloud atlas database](https://www.mongodb.com/atlas/database).
5. You can now run the server using `npm start`. It should say that the server is running on a port.
6. Open a new terminal and navigate to the client directory. Inside of package.json change the url in the `proxy:` line to "http://localhost:PORT", replacing PORT with the one you set the server to listen on. Do the same inside of the index.js and service-worker.js files.
7. Making sure you're in the root directory of the client, run `npm install` to install the project dependencies
8. Run `npm start` to start the client which should automatically open it in your browser for you. If not, copy and paste the url provided in your terminal.
