const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./config/config.json", "utf8"));

bot.login(config.token); //token
const prefix = (config.prefix);

bot.on("ready", function() {
	console.log(`Bot hazir! ${bot.user.tag}`); //bot hazir
	setTimeout(function() {console.log(`Chatlog!`)}, 500);
	bot.user.setGame("LoL");

})

bot.on("message", function(msg) {

	console.log(`#${msg.channel.name} ${msg.author.tag}: ${msg.content}`); //chatlogger

	//bot komut yazamaz
	if(msg.author.equals(bot.user)) return;

	//argsla alakalı
	var command = msg.content.split(" ")[0].slice(config.prefix.length).toLowerCase()
	var args = msg.content.split(" ").slice(1);
	let suffix = args.join(" ");

	//pingolc
	if(command === "pingolc") {
		msg.reply(`pinginiz olculuyor...`).then(function(m) {
			m.edit(`${m.createdTimestamp - msg.createdTimestamp} milisaniye`)})}

			//soyle
			if (command === "soyle") {

					if(suffix){
						msg.channel.send(suffix);
					} else {
							msg.channel.send("Soylenecek bir sey yok!");
					}
			}
			//oyundegistir
			if(command === "oyundegistir")  {
				let args = msg.content.split(" ").slice(1);
				let game = args.join(" ");
				console.log(game);
				bot.user.setGame(game);

			}

			if(command === "lenny") {
				msg.delete();
				msg.reply("( ͡° ͜ʖ ͡°) gonderdi.");
			}

			if(command === "bilgi") {
				msg.author.send('Merhaba! Ben BoopBeepBot ve kesinlikle KATATATATATTATAT tarafından yapılmadım. :heavy_check_mark:')
			}

})
