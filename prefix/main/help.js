const { EmbedBuilder, Colors } = require("discord.js");
const { prefix } = require('../../config')
exports.run = async (client, message, args) => {

const commands = client.prefixCommands.map(x => `\`${prefix}${x.help.name}\``).join(", ")
const commandsslah = client.slashCommands.map(x => `\`/${x.name}\``).join(", ")

const embed = new EmbedBuilder()
.setDescription(`**Prefix: ${commands}**\n**Slash: ${commandsslah}**`)
.setColor(Colors.Blue)
.setTimestamp()
return message.reply({ embeds: [embed]}).catch(err => {})

};
exports.conf = {
    aliases: ["h"]
};

exports.help = {
    name: "help"
};
