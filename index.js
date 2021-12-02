const Discord = require("discord.js"); //discord.jsyi internet üzerinden çekerek bir değişken tanımlıyoruz
const client= new Discord.Client();    // client olarak atadığım değişkenin discordun clientine bağlanmasını sağlıyorum
client.login("discord botunuzun tokenini giriniz"); //oluşturduğumuz bota bağlanmak için gerek token anahatarını girerek cliente login olmamızı sağlayan komut satırı . 
const axios = require('axios'); //axios adlı api çekerken kullandığımız kütüphanenin tanımlaması


const prefix = '+'; //Discordda yazılan normal yazıların herhangi bir şeyi tetiklememesi için ayarlanmış prefix 



client.on('ready' , ()  => {    //dosyayı çalıştırdığımızda botun aktif olup olmadığını bize terminalde yansıtan kod satırı 
  console.log("Bot çalışır durumda")
});

client.on("message", async message=> {  //botun çalıştığı discord sunucularında dinlemeye başlaması için gerekli komut satırı tanımlanmıştır , tanımlanırken kullanılan async fonksiyonu api keyi çekerken beklememize olanak sağlayan await komutunu çalıştırabilmesi için oradadır
  if(+message.content.startsWith(prefix)){   //prefixin çalışması için yazılmış kod satırı
    return
  }
  const args=message.content
    .slice(prefix.lenght)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase()  
  console.log(args)                          //prefixin çalışması için yazılmış kod satırı

  if(command === '!havadurumu'){            //botu çalıştırdığımız komut olan !havadurumunu kontol eden komut satırı 
    let getHavadurumu = async () => {
      let response = await axios.get('http://api.openweathermap.org/data/2.5/weather?q=ankara&units=metric&appid=9fac20ec982dd9be29d5bc7aba60c177&lang=tr'); //güncel hava durumu bilgisini çektiğimiz apinin axios kütüphanesi ile çekilmesini sağlayan kod satırı.
      let havadurumu = response.data;
      return havadurumu;
    };
    let havadurumuValue = await getHavadurumu(); //apiden bilgi çekildiğini kontrol edebilmemiz için terminale çekilen apinin içeriğini yansıtan komut satırı .
    console.log(havadurumuValue);
    
    
    message.channel.send(new Discord.MessageEmbed() //botun discord kanalına mesaj gönderebilmesi için olan komut satırı , discord.js in içinde bulunan satır süsleme metodu olan MessageEmbed kullanarak mesajın güzel gözükmesini sağlıyoruz.
      .setColor("#51befc")
      .setTitle("***Ankara İçin Güncel Hava Durumu***")
      .setThumbnail('https://cdn.discordapp.com/attachments/254704646696730624/809486754146549811/unknown.png')
      .setDescription(` \n Derece: ***${havadurumuValue.main.temp}℃***\n Hissedilen: ***${havadurumuValue.main.feels_like}℃*** \n  Bölge: ${havadurumuValue.name} , ${havadurumuValue.sys.country}`)
      .setFooter('Ahmet Furkan Dağlı Ve Hüseyin Berkay Korucu Tarafından PG1926 Eğitimi için hazırlanmıştır.'))

  }
  


});




