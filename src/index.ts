import { Plugin } from "ittai/entities";
import { findByProps } from "ittai/webpack";
import { Command, registerCommand, unregisterAllCommands, CommandTypes } from "ittai/commands";
import FartSettings from "./components/settings"
import * as settings from "ittai/settings"

const THE_FART = "https://raw.githubusercontent.com/ItzOnlyAnimal/AliuPlugins/main/fart.mp3"
const sound = {fart: new Audio(THE_FART)};

const msgs = findByProps("sendMessage", "editMessage")

const fartCmd: Command = {
    name: "fart",
    description: "do the farting desktop edition",
    type: CommandTypes.ApplicationCommandType.CHAT,
    options: [
        {
            type: CommandTypes.ApplicationCommandOptionType.USER,
            name: "user",
            description: "the user", 
            required: false
        }
    ],

    execute(opts, ctx) {
        sound.fart.volume = settings.get("volume", 0.5) || 0.5;
        sound.fart.play();
        msgs.sendMessage(ctx.channel.id, {
            content: (opts[0]) ? `<@${opts[0].value}> fart` : "fart"
        });
    },
};

export default class Fart extends Plugin {
    start() {
        this.setSettingsPanel(FartSettings);
        registerCommand(fartCmd);
    }

    stop() {
        unregisterAllCommands();
    }
}