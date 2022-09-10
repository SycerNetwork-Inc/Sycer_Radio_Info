const Discord = require("discord.js");
const { joinVoiceChannel, createAudioResource, createAudioPlayer } = require('@discordjs/voice');

/*

Use this snippet to import the discord.js library
        
        "@discordjs/opus": "^0.8.0",
        "@discordjs/voice": "^0.11.0",
        "discord.js": "^14.3.0",

*/

class DiscordRadio {
    constructor () {
        this.client_discord = new Discord.Client({
            intents: [
                "GuildVoiceStates",
                "GuildMembers",
                "Guilds",
                "GuildIntegrations",
                "GuildMessages",
                "GuildMessageReactions",
                "GuildMessageTyping",
                "GuildVoiceStates"
            ]
        });
    }

    async init () {
        await this.client_discord.login(`token`);
        await this.Discord();
    }
    async Discord() {
        this.client_discord.on('ready', () => {


            const connection = joinVoiceChannel({
                channelId: `channel_Id`,
                guildId: `guild_id`,
                adapterCreator: this.client_discord.guilds.cache.get(`guild_id`).voiceAdapterCreator
            });

            const resource =
                createAudioResource(`https://radio.sycer.network/radio`, {
                    inlineVolume: true
                })

            const player = createAudioPlayer();
            connection.subscribe(player)
            player.play(resource)
        });
    }

}

new DiscordRadio().init()
