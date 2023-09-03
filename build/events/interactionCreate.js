"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const discord_js_1 = require("discord.js");
const index_1 = require("../index");
// handler for the interactionCreate event (ex. slash commands)
exports.event = {
    name: discord_js_1.Events.InteractionCreate,
    execute(interaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (interaction.isChatInputCommand()) {
                const command = index_1.commands.get(interaction.commandName);
                if (!command) {
                    console.error(`No command matching ${interaction.commandName} was found.`);
                    return;
                }
                try {
                    yield command.execute(interaction);
                }
                catch (error) {
                    console.error(error);
                    if (interaction.replied || interaction.deferred) {
                        yield interaction.followUp({ content: "There was an error while executing this command!", ephemeral: true });
                    }
                    else {
                        yield interaction.reply({ content: "There was an error while executing this command!", ephemeral: true });
                    }
                }
            }
            else if (interaction.isAutocomplete()) {
                const command = index_1.commands.get(interaction.commandName);
                if (!command) {
                    console.error(`No command matching ${interaction.commandName} was found.`);
                    return;
                }
                try {
                    yield command.autocomplete(interaction);
                }
                catch (error) {
                    console.error(error);
                }
            }
        });
    },
};
