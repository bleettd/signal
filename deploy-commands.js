
const { REST, Routes } = require("discord.js");
const fs = require("node:fs");
const path = require("node:path");

const commands = [];
const commandsPath = path.join(__dirname, "commands");

for (const file of fs.readdirSync(commandsPath).filter(f => f.endsWith(".js"))) {
  const command = require(path.join(commandsPath, file));
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" })
  .setToken(process.env.DISCORD_TOKEN);

async function main() {
  if (!process.env.CLIENT_ID) {
    throw new Error("CLIENT_ID is missing.");
  }

  await rest.put(
    Routes.applicationCommands(process.env.CLIENT_ID),
    { body: commands }
  );

  console.log("Signal commands registered.");
}

main().catch(console.error);
