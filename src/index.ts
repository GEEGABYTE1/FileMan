const figlet = require("figlet");
const fs = require('fs')
const path = require('path')
const {Command} = require('commander')


const program = new Command()
console.log(figlet.textSync("FileMan"));

program
  .version("1.0.0")
  .description("An example CLI for managing a directory")
  .option("-l, --ls  [value]", "List directory contents")
  .option("-m, --mkdir <value>", "Create a directory")
  .option("-t, --touch <value>", "Create a file")
  .parse(process.argv);

const options = program.opts();






