if (command === "") {
  let modRole = msg.guild.roles.find("name", "MODERATOR");
  let adminRole = msg.guild.roles.find("name", "ADMIN");
  let amdinRole = msg.guild.roles.find("name", "AMDIN");
  if (msg.member.roles.has(modRole.id) || msg.member.roles.has(adminRole.id) || msg.member.roles.has(amdinRole.id)) {
    //kod
  } else {return msg.reply("Bu komudu kullanmak için gerekli yetkiye sahip değilsin.")}
}
