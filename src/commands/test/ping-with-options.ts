import {ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";

export const command = {
  data: new SlashCommandBuilder()
    .setName("ping-with-options")
    .setDescription("Replies with Pong!")
    .addStringOption(o => o.setName("name").setDescription("a name").setRequired(true)),
  async execute(interaction: ChatInputCommandInteraction) {
    const name = interaction.options.getString("name");
    await interaction.reply("Pong!" + name);
  },
};
