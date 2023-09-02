"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commands = void 0;
// Require the necessary discord.js classes
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const discord_js_1 = require("discord.js");
const config_json_1 = require("./config.json");
// Create a new client instance
const client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
exports.commands = new discord_js_1.Collection();
const foldersPath = node_path_1.default.join(__dirname, "commands");
const commandFolders = node_fs_1.default.readdirSync(foldersPath);
for (const folder of commandFolders) {
    const commandsPath = node_path_1.default.join(foldersPath, folder);
    const commandFiles = node_fs_1.default.readdirSync(commandsPath).filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
        const filePath = node_path_1.default.join(commandsPath, file);
        const { command } = require(filePath);
        if (!command) {
            continue;
        }
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ("data" in command && "execute" in command) {
            exports.commands.set(command.data.name, command);
        }
        else {
            console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
        }
    }
}
const eventsPath = node_path_1.default.join(__dirname, "events");
const eventFiles = node_fs_1.default.readdirSync(eventsPath);
for (const file of eventFiles) {
    const filePath = node_path_1.default.join(eventsPath, file);
    const { event } = require(filePath);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
// Log in to Discord with your client's token
client.login(config_json_1.token);
