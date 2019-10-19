//grab nodes
const Discord = require('discord.js');
const client = new Discord.Client();
const conf = require("./config.json");
const pp = require("./pp.json");
const fs = require('fs');
const help = require("./commands.json");

//startup code
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  client.user.setActivity(conf.prefix);
  if (conf.debug==1) {
    console.log("debugging on")
  }
});

//triggers on messages
client.on("message", message => {
  //if its a message from a bot, quit
  if (message.author.bot) return;
  //if it doesnt have the prefix, quit
  if (message.content.indexOf(conf.prefix) !== 0) return;
  //splits the message into the command and arguements
  const args = message.content.slice(conf.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const argl = message.content.slice(conf.prefix.length + command.length)
  //commands start here
  if (command === 'help') {
    console.log(help);
  }
  if (command === 'invite') {
    message.reply("https://discordapp.com/api/oauth2/authorize?client_id=468281346200961024&permissions=8&scope=bot")
  }
  if (command === 'eval') {
  if (toString(message.author === conf.ownerID)) {
    if (conf.debug) {console.log("passed as: " + message.author);}
    eval(argl);
  }
  else {
    if (conf.debug) {
      console.log("failed as: " + message.author);
      console.log("needed: " + conf.ownerID);
    }
    message.reply("you dont have the permission, sorry.:()")
  }
  }
  if (command === 'test') {
    message.reply('your command was ' + command + ' and arguements were ' + args)
  }
  if (command === '') {
    message.reply('um...hi?');
  }
  if (command === '&') {
    message.channel.send('*visible confusion*');
  }
  if (command === 'penis') {
    message.reply('in testing');
    var json = JSON.parse(fs.readFileSync('./pp.json').toString());
    console.log(json)
    var id = message.author.id;
    console.log(id)
      console.log(json[id])
    if (json[id]) {
      var sid = json[id];
      message.reply('your pp is ' + sid + 'inches long!')
    }
    else {
      var sid = Math.trunc(Math.random() * 20);
      json[id] = sid;
      message.reply('pp scan says your pp is ' + sid + 'inches long!')
      fs.writeFileSync("pp.json", JSON.stringify(json));
    }
  }
  //commands end here
});

//logs in with token
client.login(conf.token);
