import {REST, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes} from "discord.js";
import {clientId, guildId, token} from "./config.json";
import fs from "node:fs";
import path from "node:path";
import {ICommand} from "./types";

const commands: RESTPostAPIChatInputApplicationCommandsJSONBody[] = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
  // Grab all the command files from the commands directory you created earlier
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs.readdirSync(commandsPath);
  // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const {command} = require(filePath) as {command: ICommand};

    if (!command) {
      continue;
    }
    if ("data" in command && "execute" in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
  await rest.put(Routes.applicationCommands(clientId), {body: []});
  try {
    console.log(`Started refreshing ${commands.length} application (/) commands.`);

    // The put method is used to fully refresh all commands in the guild with the current set
    const data: RESTPostAPIChatInputApplicationCommandsJSONBody[] = (await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    })) as RESTPostAPIChatInputApplicationCommandsJSONBody[];
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
})();
