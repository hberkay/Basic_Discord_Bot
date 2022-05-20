const Discord = require("discord.js"); 
const client= new Discord.Client();    
client.login("discord botunuzun tokenini giriniz"); 
const axios = require('axios'); 


const prefix = '+'; 



client.on('ready' , ()  => {     
  console.log("Bot çalışır durumda")
});

client.on("message", async message=> {  
  if(+message.content.startsWith(prefix)){  
    return
  }
  const args=message.content
    .slice(prefix.lenght)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase()  
  console.log(args)                         

  if(command === '!havadurumu'){            
    let getHavadurumu = async () => {
      let response = await axios.get('http://api.openweathermap.org/data/2.5/weather?q=ankara&units=metric&appid=9fac20ec982dd9be29d5bc7aba60c177&lang=tr'); 
      return havadurumu;
    };
    let havadurumuValue = await getHavadurumu(); 
    console.log(havadurumuValue);
    
    
    message.channel.send(new Discord.MessageEmbed()
      .setColor("#51befc")
      .setTitle("***Ankara İçin Güncel Hava Durumu***")
      .setThumbnail('https://cdn.discordapp.com/attachments/254704646696730624/809486754146549811/unknown.png')
      .setDescription(` \n Derece: ***${havadurumuValue.main.temp}℃***\n Hissedilen: ***${havadurumuValue.main.feels_like}℃*** \n  Bölge: ${havadurumuValue.name} , ${havadurumuValue.sys.country}`)
      .setFooter('Hüseyin Berkay Korucu Tarafından PG1926 Eğitimi için hazırlanmıştır.'))

  }
  


});




