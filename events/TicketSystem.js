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
const { createTranscript } = require('discord-html-transcripts');
const config = require("../config.js")
const client = require("../index.js");
const Embed = require('../functions/Embed.js');


client.on('interactionCreate', async (interaction) => {

    if (interaction.isButton() && interaction.customId === 'delete_message') {
       await  interaction.message.delete().catch(() => {})
        interaction.followUp({ content: 'Mesaj başarıyla silindi.',  ephemeral: true });
    }

   if (interaction.isRoleSelectMenu() && interaction.customId === 'destek_yetkili_rol') {
    const selectedRoleId = interaction.values[0];
    const role = interaction.guild.roles.cache.get(selectedRoleId);
    let BasvuruUserData = db.get("modalsystem") || {};
    if (role) {
        db.set("modalsystem.YetkiliRole", role.id);
      
      
       const DestekKategori = BasvuruUserData.DestekKategori ? `<#${BasvuruUserData.DestekKategori}>` : 'Ayarlanmamış';
    const DestekChannel = BasvuruUserData.DestekChannel ? `<#${BasvuruUserData.DestekChannel}>` : 'Ayarlanmamış';
    const YetkiliRole = BasvuruUserData.YetkiliRole ? `<@&${BasvuruUserData.YetkiliRole}>` : 'Ayarlanmamış';
    const logChannel = BasvuruUserData.logChannel ? `<#${BasvuruUserData.logChannel}>` : 'Ayarlanmamış';

    const embed = new EmbedBuilder()
        .setAuthor({
            name: client.user.username, 
            iconURL: client.user.avatarURL()
        })
        .setThumbnail(interaction.guild.iconURL()) 
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

    

    await interaction.update({
        embeds: [embed],

    });
      
        await interaction.followUp({ content: `Yetkili rolü **${role}** olarak ayarlandı ve veritabanına kaydedildi.`, ephemeral: true });
    } else {
        await interaction.followUp({ content: 'Seçilen rol geçerli değil.', ephemeral: true });
    }
}

if (interaction.isChannelSelectMenu() && interaction.customId === 'destek_kategori') {
    const selectedLogChannelId = interaction.values[0];
    let BasvuruUserData = db.get("modalsystem") || {};
    BasvuruUserData.DestekKategori = selectedLogChannelId;
    db.set("modalsystem", BasvuruUserData)

 const DestekKategori = BasvuruUserData.DestekKategori ? `<#${BasvuruUserData.DestekKategori}>` : 'Ayarlanmamış';
    const DestekChannel = BasvuruUserData.DestekChannel ? `<#${BasvuruUserData.DestekChannel}>` : 'Ayarlanmamış';
    const YetkiliRole = BasvuruUserData.YetkiliRole ? `<@&${BasvuruUserData.YetkiliRole}>` : 'Ayarlanmamış';
    const logChannel = BasvuruUserData.logChannel ? `<#${BasvuruUserData.logChannel}>` : 'Ayarlanmamış';

    const embed = new EmbedBuilder()
        .setAuthor({
            name: client.user.username, 
            iconURL: client.user.avatarURL()
        })
        .setThumbnail(interaction.guild.iconURL()) 
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

    

    await interaction.update({
        embeds: [embed],

    });

    await interaction.followUp({ content: `Destek Kategorisi <#${selectedLogChannelId}> olarak ayarlandı ve veritabanına kaydedildi.`, ephemeral: true });
}

if (interaction.isChannelSelectMenu() && interaction.customId === 'destek_channel') {
    const selectedDestekChannelId = interaction.values[0];
    let BasvuruUserData = db.get("modalsystem") || {};
    BasvuruUserData.DestekChannel = selectedDestekChannelId;
    db.set("modalsystem", BasvuruUserData);

 const DestekKategori = BasvuruUserData.DestekKategori ? `<#${BasvuruUserData.DestekKategori}>` : 'Ayarlanmamış';
    const DestekChannel = BasvuruUserData.DestekChannel ? `<#${BasvuruUserData.DestekChannel}>` : 'Ayarlanmamış';
    const YetkiliRole = BasvuruUserData.YetkiliRole ? `<@&${BasvuruUserData.YetkiliRole}>` : 'Ayarlanmamış';
    const logChannel = BasvuruUserData.logChannel ? `<#${BasvuruUserData.logChannel}>` : 'Ayarlanmamış';

    const embed = new EmbedBuilder()
        .setAuthor({
            name: client.user.username, 
            iconURL: client.user.avatarURL()
        })
        .setThumbnail(interaction.guild.iconURL()) 
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

    

    await interaction.update({
        embeds: [embed],

    });

    await interaction.followUp({ content: `Destek kanalı <#${selectedDestekChannelId}> olarak ayarlandı ve veritabanına kaydedildi.`, ephemeral: true });
}

if (interaction.isChannelSelectMenu() && interaction.customId === 'log_channel') {
    const selectedLogChannelId = interaction.values[0];
    let BasvuruUserData = db.get("modalsystem") || {};
    BasvuruUserData.logChannel = selectedLogChannelId;
    db.set("modalsystem", BasvuruUserData);

    const DestekKategori = BasvuruUserData.DestekKategori ? `<#${BasvuruUserData.DestekKategori}>` : 'Ayarlanmamış';
    const DestekChannel = BasvuruUserData.DestekChannel ? `<#${BasvuruUserData.DestekChannel}>` : 'Ayarlanmamış';
    const YetkiliRole = BasvuruUserData.YetkiliRole ? `<@&${BasvuruUserData.YetkiliRole}>` : 'Ayarlanmamış';
    const logChannel = BasvuruUserData.logChannel ? `<#${BasvuruUserData.logChannel}>` : 'Ayarlanmamış';

    const embed = new EmbedBuilder()
        .setAuthor({
            name: client.user.username, 
            iconURL: client.user.avatarURL()
        })
        .setThumbnail(interaction.guild.iconURL()) 
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

    

    await interaction.update({
        embeds: [embed],

    });
    await interaction.followUp({ content: `Log kanalı <#${selectedLogChannelId}> olarak ayarlandı ve veritabanına kaydedildi.`, ephemeral: true });
}
    if (!interaction.isButton()) return;

  let guildData = db.get("modalsystem") || {};

    if (!guildData) {
        return interaction.reply({ content:`**Herhangi Bir Ayar Yapılmamış.**\n\`!modal-system\` Yazarak Ayar Yapabilirsin.`,  ephemeral: true });
    }

    if (interaction.customId === 'send_message') {
        if (!guildData.DestekChannel) {
            return interaction.reply({ content: 'Destek Kanalı Ayarlanmamış.',  ephemeral: true });
        }


        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("destek")
                .setLabel("Destek Talebi Oluştur")
                .setStyle(ButtonStyle.Secondary)
	
        )

        const dropEmbed = new EmbedBuilder()
        .setColor('#ff0000') 
        .setTitle(`${client.user.username}`)
.setDescription(`**Destek Kanalına Hoşgeldiniz**
Bu Kanal Üzerinden Destek Talebi Açarak Bizden Her Konuda Destek Alabilirsiniz.
          
**Destek Talebi Oluşturmak İçin Aşağıdaki Butona Tıklayabilirsin!**
NOT: Gereksiz Destek Talebi Açman Ceza Almana Neden Olabilir.`)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }));

        const DestekChannel = interaction.guild.channels.cache.get(guildData.DestekChannel);
        if (DestekChannel) {
            DestekChannel.send({ embeds: [dropEmbed], components: [row] });
            interaction.reply({ content: 'Mesaj başarıyla gönderildi.',  ephemeral: true });
        } else {
            interaction.reply({ content: 'Destek Kanalı Silinmiş Veya Yetkim Yetmiyor.',  ephemeral: true });
        }

    } else if (interaction.customId === 'reset_system') {

db.delete("modalsystem")


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
        .setThumbnail(interaction.guild.iconURL()) 
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

   
           

    await interaction.update({
        embeds: [embed]
    });

 await interaction.followUp({ content: '✅ Destek Sistemi ayarları başarıyla sıfırlandı!', ephemeral: true });
    } else 
    
    if (interaction.customId === 'refresh_modal') {

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
        .setThumbnail(interaction.guild.iconURL()) 
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

      

    await interaction.update({
        embeds: [embed]
    });
} 

if (interaction.customId === 'buton_send_message') {
        if (!guildData.DestekChannel) {
            return interaction.reply({ content: 'Destek Kanalı Ayarlanmamış.',  ephemeral: true });
        }
        const row = new ActionRowBuilder()
        .addComponents(
            new ButtonBuilder()
                .setCustomId("destek_buton")
                .setLabel("Destek Talebi Oluştur")
                .setStyle(ButtonStyle.Secondary)
        )
        const dropEmbed = new EmbedBuilder()
        .setColor('#ff0000') 
        .setTitle(`${client.user.username}`)
.setDescription(`**Destek Kanalına Hoşgeldiniz**
Bu Kanal Üzerinden Destek Talebi Açarak Bizden Her Konuda Destek Alabilirsiniz.
          
**Destek Talebi Oluşturmak İçin Aşağıdaki Butona Tıklayabilirsin!**
NOT: Gereksiz Destek Talebi Açman Ceza Almana Neden Olabilir.`)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }));

        const DestekChannel = interaction.guild.channels.cache.get(guildData.DestekChannel);
        if (DestekChannel) {
            DestekChannel.send({ embeds: [dropEmbed], components: [row] });
            interaction.reply({ content: 'Mesaj başarıyla gönderildi.',  ephemeral: true });
        } else {
            interaction.reply({ content: 'Destek Kanalı Silinmiş Veya Yetkim Yetmiyor.',  ephemeral: true });
        }
    }


// --------------------------  S E L E C T  ---------------------------------- \\


if (interaction.customId === 'select_send_message') {
        if (!guildData.DestekChannel) {
            return interaction.reply({ content: 'Destek Kanalı Ayarlanmamış.',  ephemeral: true });
        }
        const row = new ActionRowBuilder()
        .addComponents(
            new StringSelectMenuBuilder()
            .setCustomId("destek_select")
            .setMinValues(1)
            .setMaxValues(1)
            .setPlaceholder('Açmak istediğin talep sebebini seç.')
            .setOptions(config.selectAyar)
        )


        const dropEmbed = new EmbedBuilder()
        .setColor('#ff0000') 
        .setTitle(`${client.user.username}`)
.setDescription(`**Destek Kanalına Hoşgeldiniz**
Bu Kanal Üzerinden Destek Talebi Açarak Bizden Her Konuda Destek Alabilirsiniz.
          
**Destek Talebi Oluşturmak İçin Aşağıdaki Butona Tıklayabilirsin!**
NOT: Gereksiz Destek Talebi Açman Ceza Almana Neden Olabilir.`)
        .setThumbnail(interaction.guild.iconURL({ dynamic: true }));

        const DestekChannel = interaction.guild.channels.cache.get(guildData.DestekChannel);
        if (DestekChannel) {
            DestekChannel.send({ embeds: [dropEmbed], components: [row] });
            interaction.reply({ content: 'Mesaj başarıyla gönderildi.',  ephemeral: true });
        } else {
            interaction.reply({ content: 'Destek Kanalı Silinmiş Veya Yetkim Yetmiyor.',  ephemeral: true });
        }
    }


// --------------------------  S E L E C T  --------------------------------------- \\

});

client.on('interactionCreate', async i => {

    let guildData = db.get("modalsystem");
    let talepDataveri = db.get(`ticketsayı_${i.user.id}_${i.guild.id}`, 1);
    let talepData = talepDataveri + 1; 
// -------------------------------------------------------------------------------- \\

if (i.customId === "destek_select") {
    let a = db.get(`ticketsayı_${i.user.id}_${i.guild.id}`) || 0
db.set(`ticketsayı_${i.user.id}_${i.guild.id}`, a + 1)
            await i.deferReply({  ephemeral: true });
let sebep = i.values[0];
if (db.get(`userticket_${i.guild.id}_${i.user.id}`)) {
          const ticketData = db.get(`userticket_${i.guild.id}_${i.user.id}`);
  
          const kanalLink = `https://discord.com/channels/${i.guild.id}/${ticketData.kanal}`;
  
                    const kanalit = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel("Destek Talebine Git")
                            .setStyle(ButtonStyle.Link)
                            .setURL(kanalLink)
                    );
                    return i.reply({ 
                      embeds: [
                          await Embed(client.user.username, i.guild.iconURL(),
                          `**Sunucuda Zaten Açık Bir Destek Talebiniz Var**\n<#${ticketData.kanal}>`)
                          ],
                          components: [kanalit],
                      ephemeral: true })
           
        }
            let kategori = i.guild.channels.cache.get(guildData.DestekKategori)
            let yetkili = i.guild.roles.cache.get(guildData.YetkiliRole)
            let log = i.guild.channels.cache.get(guildData.logChannel)
            if (kategori) {
                await i.guild.channels.create({
                    parent: kategori.id,
                    name: `destek-${i.user.username}`,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: i.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: i.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages],
                        },
                        {
                            id: yetkili.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages],
                        }
                    ],
                }).then(async (e) => {
                  const row = new ActionRowBuilder()
                  .addComponents(
                      new ButtonBuilder()
                          .setCustomId(`kapatdestek-${e.id}-${i.user.id}`)
                          .setLabel("Talebi Kapat")
                          .setStyle(ButtonStyle.Danger),
              
                      new ButtonBuilder()
                          .setCustomId(`ticket_add_user`)
                          .setLabel("Kullanıcı Ekle")
                          .setStyle(ButtonStyle.Primary),
              
                      new ButtonBuilder()
                          .setCustomId(`ticket_remove_user`)
                          .setLabel("Kullanıcı Çıkar")
                          .setStyle(ButtonStyle.Secondary)
                  );
                    await e.send({
                        embeds: [new EmbedBuilder().setAuthor({ name: `${i.guild.name}`, iconURL: i.guild.iconURL() }).setTitle("Destek Talebi").setDescription(`Merhaba yetkililerin cevap vermesini bekleyebilirsin.`).addFields([
                            { name: `Kullanıcı`, value: `${i.user} - ${i.user.username} - ${i.user.id}`, inline: true },
                            { name: `Açılış Zaman`, value: `<t:${Math.floor((Date.now()) / 1000)}:f>`, inline: true },
                            { name: `Sebep`, value: `\`\`\`${sebep}\`\`\`` },
                            { name: `Toplam Talep Sayı`, value: `${talepData}`, inline: true }
                        ]).setColor('Blurple').setThumbnail(i.guild.iconURL()).setTimestamp().setFooter({ text: `${i.guild.name}`, iconURL: i.guild.iconURL() })], components: [row]
                    })
                    const kanalLink = `https://discord.com/channels/${i.guild.id}/${e.id}`; 
  
                    const kanalit = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel("Destek Talebine Git")
                            .setStyle(ButtonStyle.Link)
                            .setURL(kanalLink) 
                    );
                    await i.followUp({ 
                      embeds: [
                          await Embed(client.user.username, i.guild.iconURL(),
                          `**Senin İçin Bir Destek Kanalı Oluşturuldu!**\n${e}`)
                          ],
                          components: [kanalit],
                      ephemeral: true })
                    await db.set(`userticket_${i.guild.id}_${i.user.id}`,
                        {
                            kanal: `${e.id}`,
                            zaman: Date.now()
                        })
                })
            } else {
                await i.guild.channels.create({
                    name: `destek-${i.user.username}`,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: i.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: i.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages],
                        },
                        {
                            id: yetkili.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages],
                        }
                    ],
                }).then(async (e) => {
                  const row = new ActionRowBuilder()
                  .addComponents(
                      new ButtonBuilder()
                          .setCustomId(`kapatdestek-${e.id}-${i.user.id}`)
                          .setLabel("Talebi Kapat")
                          .setStyle(ButtonStyle.Danger),
              
                      new ButtonBuilder()
                          .setCustomId(`ticket_add_user`)
                          .setLabel("Kullanıcı Ekle")
                          .setStyle(ButtonStyle.Success),
              
                      new ButtonBuilder()
                          .setCustomId(`ticket_remove_user`)
                          .setLabel("Kullanıcı Çıkar")
                          .setStyle(ButtonStyle.Danger)
                  );
          
                    await e.send({
                        content: `${i.user} - ${yetkili}`,
                        embeds: [new EmbedBuilder().setAuthor({ name: `${i.guild.name}`, iconURL: i.guild.iconURL() }).setTitle("Destek Talebi").setDescription(`Merhaba yetkililerin cevap vermesini bekleyebilirsin.`).addFields([
                            { name: `Kullanıcı`, value: `${i.user} - ${i.user.username} - ${i.user.id}`, inline: true },
                            { name: `Açılış Zaman`, value: `<t:${Math.floor((Date.now()) / 1000)}:f>`, inline: true },
                            { name: `Sebep`, value: `\`\`\`${sebep}\`\`\`` },
                            { name: `Toplam Talep Sayı`, value: `${talepData}`, inline: true }
                        ]).setColor('Blurple').setThumbnail(i.guild.iconURL()).setTimestamp().setFooter({ text: `${i.guild.name}`, iconURL: i.guild.iconURL() })], components: [row]
                    })
                    await log.send({
                        embeds: [new EmbedBuilder().setAuthor({ name: `${i.guild.name}`, iconURL: i.guild.iconURL() }).setTitle("Destek Talebi").setDescription(`Merhaba yetkililerin cevap vermesini bekleyebilirsin.`).addFields([
                            { name: `Kullanıcı`, value: `${i.user} - ${i.user.username} - ${i.user.id}`, inline: true },
                            { name: `Açılış Zaman`, value: `<t:${Math.floor((Date.now()) / 1000)}:f>`, inline: true },
                            { name: `Sebep`, value: `\`\`\`${sebep}\`\`\`` },
                            { name: `Toplam Talep Sayı`, value: `${talepData}`, inline: true }
                        ]).setColor('Blurple').setThumbnail(i.guild.iconURL()).setTimestamp().setFooter({ text: `${i.guild.name}`, iconURL: i.guild.iconURL() })]
                    })
                    await i.followUp({ content: `Destek talebiniz oluşturuldu: ${e}`,  ephemeral: true })
                    await db.set(`userticket_${i.guild.id}_${i.user.id}`,
                        {
                            kanal: `${e.id}`,
                            zaman: Date.now()
                        })
                })
            }
        }


if (i.customId === "destek_buton") {
            await i.deferReply({  ephemeral: true });

    let a = db.get(`ticketsayı_${i.user.id}_${i.guild.id}`) || 0
db.set(`ticketsayı_${i.user.id}_${i.guild.id}`, a + 1)
if (db.get(`userticket_${i.guild.id}_${i.user.id}`)) {
          const ticketData = db.get(`userticket_${i.guild.id}_${i.user.id}`);
  
          const kanalLink = `https://discord.com/channels/${i.guild.id}/${ticketData.kanal}`;
  
                    const kanalit = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel("Destek Talebine Git")
                            .setStyle(ButtonStyle.Link)
                            .setURL(kanalLink)
                    );
                    return i.followUp({ 
                      embeds: [
                          await Embed(client.user.username, i.guild.iconURL(),
                          `**Sunucuda Zaten Açık Bir Destek Talebiniz Var**\n<#${ticketData.kanal}>`)
                          ],
                          components: [kanalit],
                      ephemeral: true })
        }

            let sebep = "Bilinmiyor";
            let kategori = i.guild.channels.cache.get(guildData.DestekKategori)
            let yetkili = i.guild.roles.cache.get(guildData.YetkiliRole)
            let log = i.guild.channels.cache.get(guildData.logChannel)
            if (kategori) {
                await i.guild.channels.create({
                    parent: kategori.id,
                    name: `destek-${i.user.username}`,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: i.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: i.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages],
                        },
                        {
                            id: yetkili.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages],
                        }
                    ],
                }).then(async (e) => {
                  const row = new ActionRowBuilder()
                  .addComponents(
                      new ButtonBuilder()
                          .setCustomId(`kapatdestek-${e.id}-${i.user.id}`)
                          .setLabel("Talebi Kapat")
                          .setStyle(ButtonStyle.Danger),
              
                      new ButtonBuilder()
                          .setCustomId(`ticket_add_user`)
                          .setLabel("Kullanıcı Ekle")
                          .setStyle(ButtonStyle.Primary),
              
                      new ButtonBuilder()
                          .setCustomId(`ticket_remove_user`)
                          .setLabel("Kullanıcı Çıkar")
                          .setStyle(ButtonStyle.Secondary)
                  );
                    await e.send({
                        embeds: [new EmbedBuilder().setAuthor({ name: `${i.guild.name}`, iconURL: i.guild.iconURL() }).setTitle("Destek Talebi").setDescription(`Merhaba yetkililerin cevap vermesini bekleyebilirsin.`).addFields([
                            { name: `Kullanıcı`, value: `${i.user} - ${i.user.username} - ${i.user.id}`, inline: true },
                            { name: `Açılış Zaman`, value: `<t:${Math.floor((Date.now()) / 1000)}:f>`, inline: true },
                            { name: `Sebep`, value: `\`\`\`${sebep}\`\`\`` },
                            { name: `Toplam Talep Sayı`, value: `${talepData}`, inline: true }
                        ]).setColor('Blurple').setThumbnail(i.guild.iconURL()).setTimestamp().setFooter({ text: `${i.guild.name}`, iconURL: i.guild.iconURL() })], components: [row]
                    })
                    const kanalLink = `https://discord.com/channels/${i.guild.id}/${e.id}`; 
  
                    const kanalit = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel("Destek Talebine Git")
                            .setStyle(ButtonStyle.Link)
                            .setURL(kanalLink) 
                    );
                    await i.followUp({ 
                      embeds: [
                          await Embed(client.user.username, i.guild.iconURL(),
                          `**Senin İçin Bir Destek Kanalı Oluşturuldu!**\n${e}`)
                          ],
                          components: [kanalit],
                      ephemeral: true })
                    await db.set(`userticket_${i.guild.id}_${i.user.id}`,
                        {
                            kanal: `${e.id}`,
                            zaman: Date.now()
                        })
                })
            } else {
                await i.guild.channels.create({
                    name: `destek-${i.user.username}`,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: i.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: i.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages],
                        },
                        {
                            id: yetkili.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages],
                        }
                    ],
                }).then(async (e) => {
                  const row = new ActionRowBuilder()
                  .addComponents(
                      new ButtonBuilder()
                          .setCustomId(`kapatdestek-${e.id}-${i.user.id}`)
                          .setLabel("Talebi Kapat")
                          .setStyle(ButtonStyle.Danger),
              
                      new ButtonBuilder()
                          .setCustomId(`ticket_add_user`)
                          .setLabel("Kullanıcı Ekle")
                          .setStyle(ButtonStyle.Success),
              
                      new ButtonBuilder()
                          .setCustomId(`ticket_remove_user`)
                          .setLabel("Kullanıcı Çıkar")
                          .setStyle(ButtonStyle.Danger)
                  );
          
                    await e.send({
                        content: `${i.user} - ${yetkili}`,
                        embeds: [new EmbedBuilder().setAuthor({ name: `${i.guild.name}`, iconURL: i.guild.iconURL() }).setTitle("Destek Talebi").setDescription(`Merhaba yetkililerin cevap vermesini bekleyebilirsin.`).addFields([
                            { name: `Kullanıcı`, value: `${i.user} - ${i.user.username} - ${i.user.id}`, inline: true },
                            { name: `Açılış Zaman`, value: `<t:${Math.floor((Date.now()) / 1000)}:f>`, inline: true },
                            { name: `Sebep`, value: `\`\`\`${sebep}\`\`\`` },
                            { name: `Toplam Talep Sayı`, value: `${talepData}`, inline: true }
                        ]).setColor('Blurple').setThumbnail(i.guild.iconURL()).setTimestamp().setFooter({ text: `${i.guild.name}`, iconURL: i.guild.iconURL() })], components: [row]
                    })
                    await log.send({
                        embeds: [new EmbedBuilder().setAuthor({ name: `${i.guild.name}`, iconURL: i.guild.iconURL() }).setTitle("Destek Talebi").setDescription(`Merhaba yetkililerin cevap vermesini bekleyebilirsin.`).addFields([
                            { name: `Kullanıcı`, value: `${i.user} - ${i.user.username} - ${i.user.id}`, inline: true },
                            { name: `Açılış Zaman`, value: `<t:${Math.floor((Date.now()) / 1000)}:f>`, inline: true },
                            { name: `Sebep`, value: `\`\`\`${sebep}\`\`\`` },
                            { name: `Toplam Talep Sayı`, value: `${talepData}`, inline: true }
                        ]).setColor('Blurple').setThumbnail(i.guild.iconURL()).setTimestamp().setFooter({ text: `${i.guild.name}`, iconURL: i.guild.iconURL() })]
                    })
                    await i.followUp({ content: `Destek talebiniz oluşturuldu: ${e}`,  ephemeral: true })
                    await db.set(`userticket_${i.guild.id}_${i.user.id}`,
                        {
                            kanal: `${e.id}`,
                            zaman: Date.now()
                        })
                })
            }
        }
    
// -------------------------------------------------------------------------------- \\
    if (i.customId === 'destek') {
    let a = db.get(`ticketsayı_${i.user.id}_${i.guild.id}`) || 0
db.set(`ticketsayı_${i.user.id}_${i.guild.id}`, a + 1) 
        if (db.get(`userticket_${i.guild.id}_${i.user.id}`)) {
          const ticketData = db.get(`userticket_${i.guild.id}_${i.user.id}`);
  
          const kanalLink = `https://discord.com/channels/${i.guild.id}/${ticketData.kanal}`;
  
                    const kanalit = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel("Destek Talebine Git")
                            .setStyle(ButtonStyle.Link)
                            .setURL(kanalLink)
                    );
                    return i.reply({ 
                      embeds: [
                          await Embed(client.user.username, i.guild.iconURL(),
                          `**Sunucuda Zaten Açık Bir Destek Talebiniz Var**\n<#${ticketData.kanal}>`)
                          ],
                          components: [kanalit],
                      ephemeral: true })
           
        }
        const modal = new ModalBuilder()
            .setCustomId("talep")
            .setTitle("Destek Talebi");
  
        const sebep = new TextInputBuilder()
            .setCustomId("sebep")
            .setLabel("Sebep?")
            .setPlaceholder(`Hoşgeldin ${i.user.username}, Lütfen Destek Açma Sebebini Gir.`)
            .setMinLength(5)
            .setMaxLength(200)
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph);
  
        const row = new ActionRowBuilder().addComponents(sebep);
  
        modal.addComponents(row);
        await i.showModal(modal);
    }
    if (i.isModalSubmit()) {
        if (i.customId === "talep") {
            await i.deferReply({  ephemeral: true });

            let sebep = i.fields.getTextInputValue('sebep')
            let kategori = i.guild.channels.cache.get(guildData.DestekKategori)
            let yetkili = i.guild.roles.cache.get(guildData.YetkiliRole)
            let log = i.guild.channels.cache.get(guildData.logChannel)
            if (kategori) {
                await i.guild.channels.create({
                    parent: kategori.id,
                    name: `destek-${i.user.username}`,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: i.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: i.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages],
                        },
                        {
                            id: yetkili.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages],
                        }
                    ],
                }).then(async (e) => {
                  const row = new ActionRowBuilder()
                  .addComponents(
                      new ButtonBuilder()
                          .setCustomId(`kapatdestek-${e.id}-${i.user.id}`)
                          .setLabel("Talebi Kapat")
                          .setStyle(ButtonStyle.Danger),
              
                      new ButtonBuilder()
                          .setCustomId(`ticket_add_user`)
                          .setLabel("Kullanıcı Ekle")
                          .setStyle(ButtonStyle.Primary),
              
                      new ButtonBuilder()
                          .setCustomId(`ticket_remove_user`)
                          .setLabel("Kullanıcı Çıkar")
                          .setStyle(ButtonStyle.Secondary)
                  );
                    await e.send({
                        embeds: [new EmbedBuilder().setAuthor({ name: `${i.guild.name}`, iconURL: i.guild.iconURL() }).setTitle("Destek Talebi").setDescription(`Merhaba yetkililerin cevap vermesini bekleyebilirsin.`).addFields([
                            { name: `Kullanıcı`, value: `${i.user} - ${i.user.username} - ${i.user.id}`, inline: true },
                            { name: `Açılış Zaman`, value: `<t:${Math.floor((Date.now()) / 1000)}:f>`, inline: true },
                            { name: `Sebep`, value: `\`\`\`${sebep}\`\`\`` },
                            { name: `Toplam Talep Sayı`, value: `${talepData}`, inline: true }
                        ]).setColor('Blurple').setThumbnail(i.guild.iconURL()).setTimestamp().setFooter({ text: `${i.guild.name}`, iconURL: i.guild.iconURL() })], components: [row]
                    })
                    const kanalLink = `https://discord.com/channels/${i.guild.id}/${e.id}`; 
  
                    const kanalit = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setLabel("Destek Talebine Git")
                            .setStyle(ButtonStyle.Link)
                            .setURL(kanalLink) 
                    );
                    await i.followUp({ 
                      embeds: [
                          await Embed(client.user.username, i.guild.iconURL(),
                          `**Senin İçin Bir Destek Kanalı Oluşturuldu!**\n${e}`)
                          ],
                          components: [kanalit],
                      ephemeral: true })
                    await db.set(`userticket_${i.guild.id}_${i.user.id}`,
                        {
                            kanal: `${e.id}`,
                            sebep: sebep,
                            zaman: Date.now()
                        })
                })
            } else {
                await i.guild.channels.create({
                    name: `destek-${i.user.username}`,
                    type: ChannelType.GuildText,
                    permissionOverwrites: [
                        {
                            id: i.guild.id,
                            deny: [PermissionsBitField.Flags.ViewChannel],
                        },
                        {
                            id: i.user.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages],
                        },
                        {
                            id: yetkili.id,
                            allow: [PermissionsBitField.Flags.ViewChannel, PermissionsBitField.Flags.AttachFiles, PermissionsBitField.Flags.SendMessages],
                        }
                    ],
                }).then(async (e) => {
                  const row = new ActionRowBuilder()
                  .addComponents(
                      new ButtonBuilder()
                          .setCustomId(`kapatdestek-${e.id}-${i.user.id}`)
                          .setLabel("Talebi Kapat")
                          .setStyle(ButtonStyle.Danger),
              
                      new ButtonBuilder()
                          .setCustomId(`ticket_add_user`)
                          .setLabel("Kullanıcı Ekle")
                          .setStyle(ButtonStyle.Success),
              
                      new ButtonBuilder()
                          .setCustomId(`ticket_remove_user`)
                          .setLabel("Kullanıcı Çıkar")
                          .setStyle(ButtonStyle.Danger)
                  );
          
                    await e.send({
                        content: `${i.user} - ${yetkili}`,
                        embeds: [new EmbedBuilder().setAuthor({ name: `${i.guild.name}`, iconURL: i.guild.iconURL() }).setTitle("Destek Talebi").setDescription(`Merhaba yetkililerin cevap vermesini bekleyebilirsin.`).addFields([
                            { name: `Kullanıcı`, value: `${i.user} - ${i.user.username} - ${i.user.id}`, inline: true },
                            { name: `Açılış Zaman`, value: `<t:${Math.floor((Date.now()) / 1000)}:f>`, inline: true },
                            { name: `Sebep`, value: `\`\`\`${sebep}\`\`\`` },
                            { name: `Toplam Talep Sayı`, value: `${talepData}`, inline: true }
                        ]).setColor('Blurple').setThumbnail(i.guild.iconURL()).setTimestamp().setFooter({ text: `${i.guild.name}`, iconURL: i.guild.iconURL() })], components: [row]
                    })
                    await log.send({
                        embeds: [new EmbedBuilder().setAuthor({ name: `${i.guild.name}`, iconURL: i.guild.iconURL() }).setTitle("Destek Talebi").setDescription(`Merhaba yetkililerin cevap vermesini bekleyebilirsin.`).addFields([
                            { name: `Kullanıcı`, value: `${i.user} - ${i.user.username} - ${i.user.id}`, inline: true },
                            { name: `Açılış Zaman`, value: `<t:${Math.floor((Date.now()) / 1000)}:f>`, inline: true },
                            { name: `Sebep`, value: `\`\`\`${sebep}\`\`\`` },
                            { name: `Toplam Talep Sayı`, value: `${talepData}`, inline: true }
                        ]).setColor('Blurple').setThumbnail(i.guild.iconURL()).setTimestamp().setFooter({ text: `${i.guild.name}`, iconURL: i.guild.iconURL() })]
                    })
                    await i.followUp({ content: `Destek talebiniz oluşturuldu: ${e}`,  ephemeral: true })
                    await db.set(`userticket_${i.guild.id}_${i.user.id}`,
                        {
                            kanal: `${e.id}`,
                            sebep: sebep,
                            zaman: Date.now()
                        })
                })
            }
        }
    } 

    if (!i.isButton()) return;

    if (i.customId.startsWith('kapatdestek')) {
        await i.deferReply({  ephemeral: true })
        let kanal = i.channel;
        let userId = i.customId.split('-')[2]
        let user = i.guild.members.cache.get(userId)
        let data = await db.get(`userticket_${i.guild.id}_${userId}`)
        let log = i.guild.channels.cache.get(guildData.logChannel)

    let yetkili = guildData.YetkiliRole || 'Ayarlanmamış'; 
  
  
        if (!i.member.roles.cache.has(yetkili)) {
                    await i.editReply({
                 embeds: [
                    await Embed(client.user.username, i.guild.iconURL(),
                    "Bu işlemi Yapmaya İznin Yok!",
                    `Destek Talebinin Kontrolü Sadece Destek Yetkililerine Aittir!`)
                    ] 
                    }) 
                    return;
                }
  
        await i.editReply({ content: `Ticket kapatılıyor...`,  ephemeral: true })
        await i.channel.send({ content: `5 Saniye sonra kanal kapatılacak...` }).then(async (e) => {
            setTimeout(async () => {
                const messages = await kanal.messages.fetch({ limit: 100 });
  
                const formatted = messages
                    .sort((a, b) => a.createdTimestamp - b.createdTimestamp)
                    .map(m => `${m.author.tag} : ${m.content}`)
                    .join('\n');
  

const now = new Date();
const day = String(now.getDate()).padStart(2, '0');
const month = String(now.getMonth() + 1).padStart(2, '0'); 
const year = now.getFullYear();
const hour = String(now.getHours()).padStart(2, '0');
const minute = String(now.getMinutes()).padStart(2, '0');

const timestamp = `${day}.${month}.${year}-${hour}.${minute}`;
const fileName = `${kanal.name}-${timestamp}-transcript.html`;

const transcriptFolderPath = path.join(__dirname, "..", 'transcripts');

if (!fs.existsSync(transcriptFolderPath)) {
fs.mkdirSync(transcriptFolderPath, { recursive: true });
}

const filePath = path.join(transcriptFolderPath, fileName);

const transcriptAttachment = await createTranscript(kanal, {
limit: -1, 
returnBuffer: true,
fileName: fileName
});

        
const buffer = transcriptAttachment.attachment;

      
        fs.writeFileSync(filePath, buffer);

                    await log.send({
                         files: [transcriptAttachment],
                        embeds: [new EmbedBuilder().setAuthor({ name: `${i.guild.name}`, iconURL: i.guild.iconURL() }).setTitle("Destek Talebi").setDescription(`Merhaba yetkililerin cevap vermesini bekleyebilirsin.`).addFields([
                            { name: `Kullanıcı`, value: `${i.user} - ${i.user.username} - ${i.user.id}`, inline: true },
                            { name: `Açılış Zaman`, value: `<t:${Math.floor((data.zaman) / 1000)}:f>`, inline: true },
                            { name: `Kapanış Zaman`, value: `<t:${Math.floor((Date.now()) / 1000)}:f>`, inline: true },
                            { name: `Sebep`, value: `\`\`\`${data.sebep || "Bilinmiyor."}\`\`\`` },
                            { name: `Toplam Talep Sayı`, value: `${talepDataveri}`, inline: true }
                        ]).setColor('Blurple').setThumbnail(i.guild.iconURL()).setTimestamp().setFooter({ text: `${i.guild.name}`, iconURL: i.guild.iconURL() })]
                    });
                 
                
                await i.channel.delete().catch(err => { })
                await db.delete(`userticket_${i.guild.id}_${userId}`)
            }, 5000)
        })
  
       } 
     
    });


  
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isButton()) return;

    let guildData = db.get("modalsystem") || {};

 
        const { customId, user, guild, channel } = interaction;
    

        const ticketChannel = interaction.channel; 
    

        const isCrownOwner = interaction.guild.ownerId === user.id;  
  

    let yetkili = guildData.YetkiliRole || 'Yetkili Rolü Ayarlayın.';  


        const isTicketOwner = await db.get(`userticket_${interaction.guild.id}_${interaction.user.id}`);
    
        if (interaction.customId === 'ticket_add_user') {
   
          if (!interaction.member.roles.cache.has(yetkili)) {
              await interaction.reply({
           embeds: [
              await Embed(client.user.username, interaction.guild.iconURL(),
              "Bu işlemi Yapmaya İznin Yok!",
              `Destek Talebinin Kontrolü Sadece Destek Yetkililerine Aittir!`)
              ] ,
              ephemeral: true,
              }) 
              return;
          }
            const userSelectMenu = new UserSelectMenuBuilder()
                .setCustomId('ticket_select_add')
                .setPlaceholder('Bir kullanıcı seçin')
                .setMaxValues(1);
    
            const row = new ActionRowBuilder().addComponents(userSelectMenu);
    
            await interaction.reply({
                content: 'Lütfen eklemek istediğiniz kullanıcıyı seçin.',
                components: [row],
                ephemeral: true,
            });
        }
    
        if (customId === 'ticket_remove_user') {
  
          if (!interaction.member.roles.cache.has(yetkili)) {
              await interaction.reply({
           embeds: [
              await Embed(client.user.username, interaction.guild.iconURL(),
              "Bu işlemi Yapmaya İznin Yok!",
              `Destek Talebinin Kontrolü Sadece Destek Yetkililerine Aittir!`)
              ] ,
              ephemeral: true,
              }) 
              return;
          }
  
            const userSelectMenu = new UserSelectMenuBuilder()
                .setCustomId('ticket_select_remove')
                .setPlaceholder('Bir kullanıcı seçin')
                .setMaxValues(1);
    
            const row = new ActionRowBuilder().addComponents(userSelectMenu);
    

            await interaction.reply({
                content: 'Lütfen çıkarmak istediğiniz kullanıcıyı seçin.',
                components: [row],
                ephemeral: true,
            });
        }
         });
         
    client.on('interactionCreate', async (interaction) => {
        if (!interaction.isUserSelectMenu()) return;
        
        let guildData = db.get("modalsystem") || {};

        const { customId, values, user, guild, channel } = interaction;
    
        const ticketChannel = interaction.channel; 
    
    
        if (customId === 'ticket_select_add') {
            // Üye ekleme işlemi
            if (values.length > 3) {
                return interaction.reply({ content: 'En fazla 3 kullanıcı seçebilirsiniz!', ephemeral: true });
            }
    
            for (let userId of values) {
                const member = guild.members.cache.get(userId);
                if (!member) return;
    
                if (ticketChannel.permissionOverwrites.cache.has(member.id)) {
                  await interaction.reply({ content: `${member.user.username} zaten kanalda!`, ephemeral: true });
                  continue;
              }
  
              if (guild.ownerId === member.id) {
                  return interaction.reply({ content: 'Taç sahibi olarak kendinizi seçemezsiniz!', ephemeral: true });
              }
  

                if (await db.get(`userticket_${guild.id}_${member.id}`)) {
                    return interaction.reply({ content: 'Ticket sahibi olarak kendinizi seçemezsiniz!', ephemeral: true });
                }

                try {
                    await ticketChannel.permissionOverwrites.create(member, {
                        [PermissionsBitField.Flags.ViewChannel]: true,
                        [PermissionsBitField.Flags.SendMessages]: true,
                        [PermissionsBitField.Flags.AttachFiles]: true,
                    });
    await ticketChannel.send(`${member} Kişisi Kanala Eklendi.`)
                } catch (err) {
                    console.error(err);
                    await interaction.reply({ content: `${member.user.username} eklenemedi!`, ephemeral: true });
                }
            }
        }
    
        if (customId === 'ticket_select_remove') {

            values.forEach(async (userId) => {
                const member = guild.members.cache.get(userId); 
                if (!member) return;
    

              if (guild.ownerId === member.id) {
                  return interaction.reply({ content: 'Taç sahibi olarak kendinizi çıkaramazsınız!', ephemeral: true });
              }
  

              const overwrite = ticketChannel.permissionOverwrites.cache.get(member.id);
  

              if (!overwrite) {
                  return interaction.reply({ content: `${member.user.username} bu kanalın üyesi değil!`, ephemeral: true });
              }
    

                try {
                    await ticketChannel.permissionOverwrites.delete(member);
                    await ticketChannel.send(`${member} Kişisi Kanaldan Çıkarıldı.`)
                 
                } catch (err) {
                    console.error(err);
                    await interaction.reply({ content: `${member.user.username} çıkarılamadı!`, ephemeral: true });
                }
            });
        }
    });