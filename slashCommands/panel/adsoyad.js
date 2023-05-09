const { MessageEmbed } = require("discord.js");
const Discord = require("discord.js")
const axios = require("axios")
const fs = require("fs")
const settings = require("../../botconfig/settings.json");
const { create, get, url } = require('sourcebin');



module.exports = {
    name: "deneme", 
    description: "adsoyaddan oyuncu bilgisi", 
    options: [ 
        {
            "String":
            {
                name: "ad",
                description: "oyuncunun ismi",
                required: true,
            },
            
        },
        {
            "String":
            {
                name: "soyad",
                description: "oyuncunun soyismi",
                required: true,
            },
            
        },
        {
            "String":
            {
                name: "il",
                description: "kişinin oturduğu il (listelemeyi azaltır)",
                required: false,
            },
            
        },
        {
            "String":
            {
                name: "ilçe",
                description: "kişinin oturduğu ilçe (listelemeyi dahada azaltır)",
                required: false,
            },
            
        },
        {
            "String":
            {
                name: "anneadi",
                description: "anneadi",
                required: false,
            },
            
        },
        {
            "String":
            {
                name: "babaadi",
                description: "babaadi",
                required: false,
            },
            
        },
        {
            "String":
            {
                name: "doğumtarihi",
                description: "doğumtarihi",
                required: false,
            },
            
        },
        
    ],
    run: async (client, interaction) => {
        const ad = interaction.options.getString('ad');
        const soyad = interaction.options.getString('soyad');
        const il = interaction.options.getString('il');
        const ilçe = interaction.options.getString('ilçe');
        const anneadi = interaction.options.getString('anneadi');
        const babaadi = interaction.options.getString('babaadi');
        const doğumtarihi = interaction.options.getString('doğumtarihi');
      
        await interaction.reply({ content: "lütfen bekle sorgun yapılıyor", ephemeral: true });
      
        let apiUrl = `http://188.132.198.253:3004/api/adsoyad?key=auxo`;
      
        if (ad) apiUrl += `&isim=${ad}`;
        if (soyad) apiUrl += `&soyisim=${soyad}`;
        if (il) apiUrl += `&il=${il}`;
        if (ilçe) apiUrl += `&ilce=${ilçe}`;
        if (anneadi) apiUrl += `&anneAdi=${anneadi}`;
        if (babaadi) apiUrl += `&babaAdi=${babaadi}`;
        if (doğumtarihi) apiUrl += `&dogumTarihi=${doğumtarihi}`;
      
        axios.get(apiUrl)
          .then(async response => {
            try {
              let jsonString = JSON.stringify(response.data);
              jsonString = jsonString.replace(/\r\n/g, "");
              const jsonData = JSON.parse(jsonString);
              const last = JSON.stringify(jsonData,null,2)
              const buffer = new Buffer.from(last);
              const file = new Discord.MessageAttachment(buffer, "slm.txt", { type: 'text/plain' });
              interaction.editReply({
                content: `:tada: ${ad} ${soyad} isminde oyuncu bulundu\n(**Uyarı!** veriler oyun içi profilden alıntıdır)`
              ,
                files: [file],
              })
             
            } catch (e) {
              console.log(e)
            }
          }).catch(error => {
            if (error.code === 'ETIMEDOUT') {
              interaction.editReply({
                content: '**API İle Bağlantı Zaman Aşımına Uğradı Daha Sonra Tekrar Deneyin **Uzun Süredir Bu Hata Veriyorsa Geliştiricilerle iletişime geçin**',
                ephemeral: true
              })
            }
          })
      }
    }      