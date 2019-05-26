//grab nodes
const Discord = require('discord.js');
const client = new Discord.Client();
const conf = require("./config.json");
const ytdl = require('ytdl-core-discord');

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
  if (command === '') {
    message.reply('um...hi?');
  }
});

//logs in with token
client.login(conf.token);
