const { EmbedBuilder, Colors } = require("discord.js");
const { prefix } = require('../../config')
module.exports = {
    name: "help",
    description: "View bot slash commands.",
    options: [],
    run: async (client, interaction) => {
    
const commands = client.prefixCommands.map(x => `\`${prefix}${x.help.name}\``).join(", ")
const commandsslah = client.slashCommands.map(x => `\`/${x.name}\``).join(", ")

const embed = new EmbedBuilder()
.setDescription(`**Prefix: ${commands}**\n**Slash: ${commandsslah}**`)
.setColor(Colors.Blue)
.setTimestamp()
        return interaction.reply({ embeds: [embed]}).catch(err => {})
        
      
    },
    };