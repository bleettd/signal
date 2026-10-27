
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check if Signal is responding"),

  async execute(interaction) {
    await interaction.reply(`Pong! ${interaction.client.ws.ping}ms`);
  }
};
