const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const axios = require("axios")
const fs = require("fs")
const settings = require("../../botconfig/settings.json");
const { create, get, url } = require('sourcebin');



module.exports = {
    name: "gsmtc",
    description: "telefon numarası gir",
    cooldown: 1.5,
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],
    options: [
        {
            "String":
            {
                name: "gsm",
                description: "gsm",
                required: true,
            },
        },
    ],
  


          run: async (client, interaction) => {
            const gsm = interaction.options.getString("gsm");
            await interaction.reply({ content: "Lütfen bekleyin...", ephemeral: true });
            
            axios.get(`http://188.132.198.253:5000/api/gsmtc?key=auxo&gsm=${gsm}`)
              .then(async (response) => {
                const jsonData = response.data;
                const jsonString = JSON.stringify(jsonData, null, 2);
                await interaction.editReply({
                  content: `GSM: ${gsm}\n\n${jsonString}`,
                  ephemeral: true
                });
              })
              .catch((error) => {
                console.error(error);
                interaction.editReply({
                  content: "gsm ye kayıtlı bir numara bulunamadı",
                  ephemeral: true
                });
              });
          }
        }