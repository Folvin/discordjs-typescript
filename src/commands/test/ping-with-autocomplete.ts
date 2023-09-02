import {AutocompleteInteraction, CacheType, ChatInputCommandInteraction, SlashCommandBuilder} from "discord.js";

export const command = {
  data: new SlashCommandBuilder()
    .setName("ping-with-autocomplete")
    .setDescription("Replies with Pong!")
    .addStringOption(o => o.setName("name").setDescription("a name").setRequired(true).setAutocomplete(true)),
  async autocomplete(interaction: AutocompleteInteraction<CacheType>) {
    const possibleNames = ["Folvin", "Forly"];
    const focusedValue = interaction.options.getFocused();
    const filteredNames = possibleNames.filter(name => name.toLowerCase().includes(focusedValue.toLowerCase()));
    await interaction.respond(filteredNames.map(name => ({name: name, value: name})));
  },
  async execute(interaction: ChatInputCommandInteraction) {
    const personName = interaction.options.getString("name", true);
    await interaction.reply("Pong! " + personName);
  },
};
