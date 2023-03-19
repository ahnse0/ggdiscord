const { Client, GatewayIntentBits, ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } = require('discord.js');
const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const roles = {
    1234: '774081705408987157' // inputCode : roleCode *
};

const channelId = '1084785669739642971'; // 채널 ID

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async interaction => {
    if (interaction.isButton() && interaction.channelId === channelId) {
        const modal = new ModalBuilder()
            .setCustomId('modal')
            .setTitle('🔒 Enter the code');
        const favoriteColorInput = new TextInputBuilder()
            .setCustomId('roleCode')
            .setLabel('Role Code (8자리)')
            .setStyle(TextInputStyle.Short)
            .setPlaceholder('Role Code (8자리)')
            .setRequired(true);
        const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
        modal.addComponents(firstActionRow);
        await interaction.showModal(modal);
    } else if (interaction.isModalSubmit() && interaction.channelId === channelId) {
        const val = interaction.fields.getTextInputValue('roleCode');
        if (roles[val] != undefined ) {
            if (interaction.guild.roles.cache.get(roles[val]) != undefined) {
                await interaction.member.roles.add(roles[val]);
                await interaction.reply({ content: `<@${interaction.user.id}>님에게 <@&${roles[val]}> 역할을 추가했습니다.`, ephemeral: true });
            } else {
                await interaction.reply({content: `전달 받으신 코드를 다시 한번 확인해주세요!`, ephemeral: true});
            }
        } else {
            await interaction.reply({ content: `전달 받으신 코드를 다시 한번 확인해주세요!`, ephemeral: true });
        }
    }
});

client.login(TOKEN);
