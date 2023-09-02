import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";

export const command = {
  data: new SlashCommandBuilder().setName("ping-with-ephemeral").setDescription("Replies with Pong!"),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply({content: "Pong!", ephemeral: true});
  },
};
