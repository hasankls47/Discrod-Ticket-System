const { EmbedBuilder, Colors,PermissionsBitField } = require("discord.js");
const db = require("codeworld/db");
const Embed = require('../../functions/Embed.js');
const config = require("../../config.js");
module.exports = {
    name: "talep-sayi",
    description: "Bir kullanıcının talep sayısını gösterir.",
    options: [
        {
            name: "kullanici",
            description: "Talep sayısını görmek istediğiniz kullanıcı.",
            type: 6, 
            required: false
        }
    ],
    run: async (client, interaction) => {
    const allowedUsers = config.botsahipler;
    if (!allowedUsers.includes(interaction.user.id) && !interaction.member.roles.cache.has(PermissionsBitField.Flags.Administrator)) {
        await interaction.reply({
            embeds: [
                await Embed(client.user.username, interaction.guild.iconURL(),
                    "Bu işlemi Yapabilmek İçin Yetkin Yetmiyor!",
                    `Bu Komutu Kullanabilmek İçin **Yönetici** Yetkisine Sahip Olmalısın!`)
            ],
            ephemeral: true
        });
        return;
    }
        const targetUser = interaction.options.getUser("kullanici") || interaction.user;
        const guildId = interaction.guild.id; 

        const talepSayisi = db.get(`ticketsayı_${targetUser.id}_${guildId}`) || 0;

        const embed = new EmbedBuilder()
            .setColor(Colors.Green) 
            .setTimestamp();


        if (targetUser.id === interaction.user.id) {
            embed.setDescription(`🎉 Toplam **${talepSayisi}** adet talebiniz bulunmaktadır.`);
        } else {
            
            embed.setDescription(`📈 **${targetUser.username}** kullanıcısının toplam **${talepSayisi}** adet talebi bulunmaktadır.`);
        }

        embed.setAuthor({ name:`${targetUser.username}`,iconURL :targetUser.displayAvatarURL({ dynamic: true, size: 256 })});

        return interaction.reply({ embeds: [embed] }).catch(err => {
            console.error("Talep sayısı komutu gönderilirken bir hata oluştu:", err);
        });
    },
};