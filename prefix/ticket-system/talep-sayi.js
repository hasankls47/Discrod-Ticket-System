const {
    EmbedBuilder,
    Colors,
    PermissionsBitField
} = require("discord.js");
const db = require("codeworld/db");
const config = require("../../config.js");
const Embed = require('../../functions/Embed.js');

exports.run = async (client, message, args) => {
    const allowedUsers = config.botsahipler;
    if (!allowedUsers.includes(message.author.id) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        await message.reply({
            embeds: [
                await Embed(client.user.username, message.guild.iconURL(),
                    "Bu işlemi Yapabilmek İçin Yetkin Yetmiyor!",
                    `Bu Komutu Kullanabilmek İçin **Yönetici** Yetkisine Sahip Olmalısın!`)
            ]
        });
        return;
    }

    let targetUser;
    if (args[0]) {
        targetUser = message.mentions.users.first() ||
                     await client.users.fetch(args[0]).catch(() => null) ||
                     message.guild.members.cache.find(m => m.user.username === args[0] || m.user.tag === args[0])?.user;

        if (!targetUser) {
            await message.reply({
                embeds: [
                    await Embed(client.user.username, message.guild.iconURL(),
                        "Kullanıcı Bulunamadı!",
                        `Belirttiğiniz kullanıcıyı bulamadım. Lütfen geçerli bir kullanıcı etiketi (@kullanıcı) veya kullanıcı ID'si girin.`)
                ]
            });
            return;
        }
    } else {
        targetUser = message.author;
    }

    const guildId = message.guild.id;
    const talepSayisi = db.get(`ticketsayı_${targetUser.id}_${guildId}`) || 0;

    const embed = new EmbedBuilder()
        .setColor(Colors.Green)
        .setTimestamp();

    if (targetUser.id === message.author.id) {
        embed.setDescription(`🎉 Toplam **${talepSayisi}** adet talebiniz bulunmaktadır.`);
    } else {
        embed.setDescription(`📈 **${targetUser.username}** kullanıcısının toplam **${talepSayisi}** adet talebi bulunmaktadır.`);
    }

    embed.setAuthor({ name: `${targetUser.username}`, iconURL: targetUser.displayAvatarURL({ dynamic: true, size: 256 }) });

    await message.reply({ embeds: [embed] }).catch(err => {
        console.error("Talep sayısı komutu gönderilirken bir hata oluştu:", err);
    });
};

exports.conf = {
    aliases: ["ts", "ticketsayi", "ticket-count"]
};

exports.help = {
    name: "talep-sayi"
};