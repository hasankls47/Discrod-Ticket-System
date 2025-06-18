const {
UserSelectMenuBuilder,
PermissionsBitField ,
GatewayIntentBits, Partials, 
ButtonBuilder, ButtonComponent, 
ButtonStyle, ActionRowBuilder,
 ModalBuilder, TextInputBuilder, 
 TextInputStyle, Collection, 
 AttachmentBuilder, RoleSelectMenuBuilder,
 ChannelSelectMenuBuilder, ChannelType,
 EmbedBuilder, PresenceUpdateStatus,
 StringSelectMenuBuilder
 } = require("discord.js");
const fs = require("fs");
const path = require("path")
const db = require("codeworld/db")
const config = require("../../config.js")
const client = require("../../index.js");
const Embed = require('../../functions/Embed.js');


exports.run = async (client, message, args) => {

        const allowedUsers = config.botsahipler;
if (!allowedUsers.includes(message.author.id) && !message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            await message.reply({
         embeds: [
            await Embed(client.user.username, message.guild.iconURL(),
            "Bu işlemi Yapabilmek İçin Yetkin Yetmiyoır!",
            `Bu Komnutu Kullanabilmek İçin **Yönetici** Yetkisine Sahip Olmaısın!`)
            ] 
            }) 
            return;
        }

const BasvuruUserData = db.get("modalsystem") || {};

const DestekKategori = BasvuruUserData.DestekKategori ? `<#${BasvuruUserData.DestekKategori}>` : 'Ayarlanmamış';
const DestekChannel = BasvuruUserData.DestekChannel ? `<#${BasvuruUserData.DestekChannel}>` : 'Ayarlanmamış';
const YetkiliRole = BasvuruUserData.YetkiliRole ? `<@&${BasvuruUserData.YetkiliRole}>` : 'Ayarlanmamış';
const logChannel = BasvuruUserData.logChannel ? `<#${BasvuruUserData.logChannel}>` : 'Ayarlanmamış';

const embed = new EmbedBuilder()
    .setAuthor({
        name: client.user.username,
        iconURL: client.user.avatarURL()
    })
    .setThumbnail(message.guild.iconURL())
    .setFooter({ text: 'CodeWorld Modal Destek Sistemi', iconURL: 'https://i.imgur.com/ayGmpzF.png' })
    .setTimestamp()
    .setDescription('Aşağıdaki ayarları yaparak Modal Destek sistemi kurabiirsiniz.')
    .setColor('#ff0000')
    .addFields(
        { name: 'Destek Kategori', value: `Bu menüden destek kategorisini seçebilirsiniz. (${DestekKategori})`, inline: false },
        { name: 'Destek Kanalı', value: `Bu menüden destek kanalını seçebilirsiniz. (${DestekChannel})`, inline: false },
        { name: 'Destek Yetkili Rolü', value: `Bu menüden yetkili rolünü seçebilirsiniz. (${YetkiliRole})`, inline: false },
        { name: 'Destek Log Kanalı', value: `Bu menüden destek log kanalını seçebilirsiniz. (${logChannel})`, inline: false },
        { name: 'Mesaj Gönder', value: `Bu butondan tüm ayarları yaptıktan sonra scrim oto rol mesajını gönderebilirsiniz.`, inline: false },
        { name: 'Sistemi Sıfırla', value: `Bu butondan tüm ayarları sıfırlayabilirsiniz.`, inline: false },
        { name: 'Mesaj Sil', value: `Bu butondan bu mesajı silebilirsiniz.`, inline: false }
    );


        const roleMenu = new ActionRowBuilder().addComponents(
            new RoleSelectMenuBuilder()
                .setCustomId('destek_yetkili_rol')
                .setPlaceholder(BasvuruUserData.YetkiliRole ? message.guild.roles.cache.get(BasvuruUserData.YetkiliRole)?.name || 'Yetkili Rolü ayarlanmamış' : 'Yetkili Rolü ayarlanmamış')  // Eğer YetkiliRole ayarlandıysa, rol adı gösterilsin
        );


        const DestekChannelMenu = new ActionRowBuilder().addComponents(
            new ChannelSelectMenuBuilder()
                .setCustomId('destek_channel')
                .setChannelTypes([0])
                .setPlaceholder(BasvuruUserData.DestekChannel ? message.guild.channels.cache.get(BasvuruUserData.DestekChannel)?.name || 'Destek kanalı ayarlanmamış' : 'Destek kanalı ayarlanmamış')  // Eğer DestekChannel ayarlandıysa, kanal adı görünsün
        );


        const logChannelMenu = new ActionRowBuilder().addComponents(
            new ChannelSelectMenuBuilder()
                .setCustomId('log_channel')
                .setChannelTypes([0])
                .setPlaceholder(BasvuruUserData.logChannel ? message.guild.channels.cache.get(BasvuruUserData.logChannel)?.name || 'Log kanalı ayarlanmamış' : 'Log kanalı ayarlanmamış')  // Eğer logChannel ayarlandıysa, kanal adı görünsün
        );

        const DestekKategoriMenu = new ActionRowBuilder().addComponents(
            new ChannelSelectMenuBuilder()
                .setCustomId('destek_kategori')
                .setChannelTypes([4])
                .setPlaceholder(BasvuruUserData.DestekKategori ? message.guild.channels.cache.get(BasvuruUserData.DestekKategori)?.name || 'Kategori ayarlanmamış' : 'Kategori ayarlanmamış')  // Eğer logChannel ayarlandıysa, kanal adı görünsün
        );


        const buttons = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId('send_message')
                .setLabel('Mesaj Gönder')
                .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
                .setCustomId('reset_system')
                .setLabel('Sistemi Sıfırla')
                .setStyle(ButtonStyle.Secondary),
                new ButtonBuilder()
                .setCustomId('refresh_modal')
                .setEmoji("1384247450897743882")
                .setStyle(ButtonStyle.Danger),
            new ButtonBuilder()
                .setCustomId('delete_message')
                .setLabel('Mesajı Sil')
                .setStyle(ButtonStyle.Danger)
        );


        const msg = await message.channel.send({
           embeds: [embed],
            components: [roleMenu, DestekChannelMenu, logChannelMenu,DestekKategoriMenu, buttons]
        });

}
exports.conf = {
    aliases: ["ms"]
};

exports.help = {
    name: "modal-system"
};