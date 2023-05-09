const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const axios = require("axios")
const fs = require("fs")
const settings = require("../../botconfig/settings.json");
const { create, get, url } = require('sourcebin');



module.exports = {
    name: "tcgsm",
    description: "tc den numara",
    cooldown: 1.5,
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],
    options: [
        {
            "String":
            {
                name: "tc",
                description: "tc",
                required: true,
            },
        },
    ],
  

    run: async (client, interaction) => {
        const tc = interaction.options.getString("tc");
        await interaction.reply({ content: "Lütfen bekleyin...", ephemeral: true });
        
        axios.get(`http://188.132.198.253:8001/api/tcgsm?key=auxo&tc=${tc}`)
          .then(async (response) => {
            const jsonData = response.data;
            const jsonString = JSON.stringify(jsonData, null, 2);
            await interaction.editReply({
              content: `TC Kimlik No: ${tc}\n\n${jsonString}`,
              ephemeral: true
            });
          })
          .catch((error) => {
            console.error(error);
            interaction.editReply({
              content: "tc ye kayıtlı bir numara bulunamadı",
              ephemeral: true
            });
          });
      }
    }