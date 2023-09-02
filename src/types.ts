import {AutocompleteInteraction, CacheType, ChatInputCommandInteraction, ClientEvents, SlashCommandBuilder} from "discord.js";

export interface ICommand {
  data: SlashCommandBuilder;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void>;
  autocomplete: (interaction: AutocompleteInteraction<CacheType>) => Promise<void>;
}

export interface IEvent {
  name: keyof ClientEvents;
  once: boolean;
  execute: (...args: unknown[]) => void | Promise<void>;
}
