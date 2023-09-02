
# discord.js setup with typescript

hi! this is a setup for developing discord bot using discord.js WITH typescript
if you would like to use this just follow theese steps:

1. clone the repo

open a terminal and run the following command:

git clone https://github.com/Folvin/discordjs-typescript.git

this will clone the repository in the current selected directory

2. install dependencies
open a terminal and select the directory you just cloned from the previous step and then run the following command
npm i

this will install all the dependency needed for this setup, here is a list:
- discord.js


# what can you find in the repo

in this setup you will find the src folder that is the folder where you will be working on using typescript here you can find the index.ts, this is the entry point for the application, deployCommands.ts it's a file that you will run to deploy all your slash commands, in shorts if you don't see your slash commands on discord try running this (later there is a list of npm commands i prepared to do theese kind of tasks) then there is the events folder that contain handlers for the various events of the discord bot (there is only ClientReady and interactionCreate but you can add more!) and a commands folder that contain other sub-folders which contains slash commands (there is just a test sub-folder with some basics command). oh! there is also a types.ts file that contains all interfaces and types and a data.json that you can use if you want to do some JSON reading and writing.
there is also the config.json that should contain the bot token and other info needed to the application to connect with your bot, obviously you need to write down them before you can run this.

# how to compile and run

it's pretty simple actually! you just have to run the following command:

npm start

this will do 3 things, first one is removing the build executing the deleteBuild.js. this is to make sure that if you rename or delete some file in the src, they actually get removed in the build in case there is an already existing build. now if you are using that data.json file, you might be worried that everything will be delete but worry not! the deleteBuild.js before actually removing the build it copies the data.json file in the build to the data.json in the src. the second thing it does is that it compile the typescript and create the build and the third one is to run the index.js into the build folder running the server.

if you don't see any slash command try to run this command

npm run deploy

this will basically execute a file called deployGuildCommands.js that will just deploy all your slash commands to the discord client, make sure the build directory is present before running this

little disclaimer: the file is using the applicationGuildCommand function so it will just update the commands in a single server, if you want to deploy commands in all servers your bot is, you need to do npm run deploy-global.

# list of npm script commands
- npm start
- npm run deploy
- npm run deploy-global
