import {Client, Events} from "discord.js";

// handler for the ClientReady event (when the server is up and running)
export const event = {
  name: Events.ClientReady,
  once: true,
  execute(client: Client<true>) {
    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
