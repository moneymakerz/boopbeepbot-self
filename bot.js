const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require("fs");
const config = JSON.parse(fs.readFileSync("./config/config.json", "utf8"));
const komutlar = (fs.readFileSync("./config/komutlar.txt", "utf8"));
const ms = require('ms')
let now = require("performance-now");

bot.login(config.token); //token
const prefix = (config.prefix);

bot.on("ready", function() {
	console.log(`Bot hazir! ${bot.user.tag}`); //bot hazir
	setTimeout(function() {console.log(`Chatlog!`)}, 500);
	bot.user.setGame(`${config.prefix}yardim`);

})

bot.on("guildMemberAdd", member => {
var role = member.guild.roles.find("name", "UYE");
member.addRole(role);
})

bot.on("message", function(msg) {
	let botRoleColor = 0x194c9e

	var message = msg

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
			m.edit({embed:{
				title:`@${msg.author.tag}`,
				description:`pinginiz ${m.createdTimestamp - msg.createdTimestamp} milisaniye`,
				color: 0x194c9e,
			}})})}

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
			  let modRole = msg.guild.roles.find("name", "MODERATOR");
			  let adminRole = msg.guild.roles.find("name", "ADMIN");
				let amdinRole = msg.guild.roles.find("name", "AMDIN");
			  if (msg.member.roles.has(modRole.id) || msg.member.roles.has(adminRole.id) || msg.member.roles.has(amdinRole.id)) {
			    let args = msg.content.split(" ").slice(1);
			    let game = args.join(" ");
			    console.log(game);
			    bot.user.setGame(game);

			  } else {return msg.reply("Bu komudu kullanmak için gerekli yetkiye sahip değilsin.")}
			}
			//lennyface
			if(command === "lenny") {
				msg.delete();
				msg.reply("( ͡° ͜ʖ ͡°) gonderdi.");
			}
			//bot bilgi
			if(command === "bilgi") {
				msg.author.send('Merhaba! Ben BoopBeepBot ve kesinlikle KATATATATATTATAT tarafından yapılmadım. :heavy_check_mark:');
			}
			//yardim
			if (command === "yardim") {
				msg.author.send(komutlar);
			}
			//prefix gosterici
			if (command === "prefix") {
				msg.reply(` prefix: ${config.prefix}`);
			}
			//nazi meme
			if (command === "nazi")
				msg.channel.send("https://i.imgflip.com/ypwjt.jpg");
				//anketbotu
				if (command === "anket") {
				  let modRole = msg.guild.roles.find("name", "MODERATOR");
				  let adminRole = msg.guild.roles.find("name", "ADMIN");
					let amdinRole = msg.guild.roles.find("name", "AMDIN");
				  if (msg.member.roles.has(modRole.id) || msg.member.roles.has(adminRole.id) || msg.member.roles.has(amdinRole.id)) {
				    let args = msg.content.split(" ").slice(1);
				    let soru = args.join(" ");
				    msg.channel.send({embed:{
				      title:`Anket`,
				      description: `${soru} ?` ,
				      color: 0x194c9e,
				    }}).then(function (msg) {
				      msg.react("👍");
				      msg.react("👎");
				  })
				  } else {return msg.reply("Bu komudu kullanmak için gerekli yetkiye sahip değilsin.")}
				}
			//ban
			if (command === "ban")  {
			  let modRole = msg.guild.roles.find("name", "MODERATOR");
			  let adminRole = msg.guild.roles.find("name", "ADMIN");
				let amdinRole = msg.guild.roles.find("name", "AMDIN");
			  if (msg.member.roles.has(modRole.id) || msg.member.roles.has(adminRole.id) || msg.member.roles.has(amdinRole.id)) {
			    let banned = msg.mentions.members.first();
			    msg.guild.member(banned.id).ban();
			    msg.author.send(`<@${banned.id}> kisi banlandi.`);
			  } else {return msg.reply("Bu komudu kullanmak için gerekli yetkiye sahip değilsin.")}
			}

			//kick
				if (command === "kick")  {
				  let modRole = msg.guild.roles.find("name", "MODERATOR");
				  let adminRole = msg.guild.roles.find("name", "ADMIN");
					let amdinRole = msg.guild.roles.find("name", "AMDIN");
				  if (msg.member.roles.has(modRole.id) || msg.member.roles.has(adminRole.id) || msg.member.roles.has(amdinRole.id)) {
				    let kicked = msg.mentions.members.first();
				    msg.guild.member(kicked.id).kick();
				    msg.author.send(`<@${kicked.id}> kicklendi.`);
				  } else {return msg.reply("Bu komudu kullanmak için gerekli yetkiye sahip değilsin.")}
				}

		//zamanli muteleme
		if (command === "mute")  {
			let modRole = msg.guild.roles.find("name", "MODERATOR");
			let adminRole = msg.guild.roles.find("name", "ADMIN");
			let amdinRole = msg.guild.roles.find("name", "AMDIN");
			if (msg.member.roles.has(modRole.id) || msg.member.roles.has(adminRole.id)) {
				let member = msg.mentions.members.first();
				if (!member) {return msg.reply("İsim belirtilmedi.")}
				let muteRole = msg.guild.roles.find("name", "Muted");
				if (!muteRole) {return msg.reply("Susturma Rolün yok.")}
				let args = msg.content.split(" ").slice(1);
				let time = args[1];
				if (!time) {return msg.reply("Zaman belirtilmedi.")}
				msg.author.send(`<@${member.id}>, ${time} mutelendi.`);
				member.addRole(muteRole.id);

				setTimeout(function() {
					member.removeRole(muteRole.id);
				}, time,
				
			} else {return msg.reply("Bu komudu kullanmak için gerekli yetkiye sahip değilsin.")}
		}
		if (command === "sil") {
		  let modRole = msg.guild.roles.find("name", "MODERATOR");
		  let adminRole = msg.guild.roles.find("name", "ADMIN");
		  let amdinRole = msg.guild.roles.find("name", "AMDIN");
		  if (msg.member.roles.has(modRole.id) || msg.member.roles.has(adminRole.id) || msg.member.roles.has(amdinRole.id)) {
		        msg.channel.fetchMessages() .then(function(list) {
		              msg.channel.bulkDelete(list);
		          }, function(err) {msg.channel.send("SORUN!")})
		  } else {return msg.reply("Bu komudu kullanmak için gerekli yetkiye sahip değilsin.")}
		}

		if (msg.content.startsWith(prefix + "eval")) {
					if(message.author.id !== config.ownerID) return;
                if (!suffix) {
                        return msg.channel.send(":x: Calismam icin koda ihtiyacim var.")
                }
                console.log('islem gerceklestirildi')
                try {
                        var evaled = eval(suffix);
                        if (typeof evaled !== "string")
                                evaled = require("util")
                                .inspect(evaled);
                        var finished = `\`\`\`js\n ${clean(evaled)}\`\`\``
                        if (finished.includes(config.token)) {
                                return msg.channel.send("", {
                                        embed: {
                                                color: botRoleColor
                                                , title: 'No.'
                                                , description: `SANA YOK!`
                                        }
                                });
                        }
                        msg.channel.send("", {
                                embed: {
                                        color: botRoleColor
                                        , title: 'BoopBeepBot - EVAL'
                                        , description: finished
                                }
                        });
                        console.log(finished)
                } catch (err) {
                        //msg.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
                        msg.channel.send("", {
                                embed: {
                                        color: botRoleColor
                                        , description: `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``
                                }
                        });
                };
        }
}); //END MESSAGE HANDLER

function clean(text) {
        if (typeof (textnow) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203))
                        .replace(/@/g, "@" + String.fromCharCode(8203))
        else
                return text;
}
