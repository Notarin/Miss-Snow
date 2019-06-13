//grab nodes
const Discord = require('discord.js');
const client = new Discord.Client();
const conf = require("./config.json");
const pp = require("./pp.json");
const fs = require('fs');

//say bot name on boot
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
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
  //help command
  if (command === 'help') {
  message.reply('no help setup yet')
  }
  //test command to see both the command and arguments
  if (command === 'test') {
    message.reply('your command was ' + command + ' and arguements were ' + args)
  }
  //placeholder command
  if (command === '') {
    message.reply('um...hi?');
  }
  if (command === 'penis') {
    message.reply('in testing');
    var json = JSON.parse(fs.readFileSync('./pp.json').toString());
    console.log(json)
    var id = message.author.id;
    console.log(id)
    if (json[id]) {
      message.reply('your pp is ' + json[id] + 'inches long!')
    }
    else {
      var sid = json[id];
      var sid = Math.trunc(Math.random() * 20);
      message.reply('pp scan says your pp is ' + sid + 'inches long!')
    }
    var json = { [id]: sid };
    fs.writeFileSync("pp.json", JSON.stringify(json));
  }
});

//logs in with token
client.login(conf.token);
