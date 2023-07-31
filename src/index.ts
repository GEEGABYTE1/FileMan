#! /usr/bin/env node
const {Command} = require('commander')


const figlet = require("figlet");
const fs = require('fs')
const path = require('path')



const program = new Command()
console.log(figlet.textSync("FileMan"));

program
  .version("1.0.0")
  .description("An example CLI for managing a directory")
  .option("-l, --ls  [value]", "List directory contents")
  .option("-m, --mkdir <value>", "Create a directory")
  .option("-t, --touch <value>", "Create a file")
  .option("-r, --read <filename>, Read a file within a directory")
  .option("-wr, --write <filename>:[text], Write to a file within a directory")
  .parse(process.argv);

  const options = program.opts();


async function listDirContents(filepath: string) {
  try {
    const files = await fs.promises.readdir(filepath)
    console.log("Files: ", files)

    const detailedFilesPromises = files.map(async (file: string) => {
      let fileDetails = await fs.promises.lstat(path.resolve(filepath, file))
      
      const {size, birthtime} = fileDetails
      return {filename: file, "size(KB)": size, created_at: birthtime}
    })

    const detailedFailes = await Promise.all(detailedFilesPromises)
    console.table(detailedFailes)

  } catch (err) {
    console.log("Error Occured while reading the directory: ", err)
  }
}


async function readContents(filepath: string) {
  try {
    console.log("File Path: ", filepath)
    try {
      const data = fs.readFileSync(filepath, 'utf8')
      console.log("Reading File: ", filepath)
      console.log('-------------------------------------------------------')
      console.log(data)
      console.log('-------------------------------------------------------')
    } catch (err) {
      console.log("Cannot Read File in Path: ", filepath)
      console.log(err)
    }

  } catch (err) {
    console.log("File not found: ", err)
  }
}

async function writeContent(filepath: string, options: string) {
  try {
    const options_array: string[] = options.split(':')
    if (options_array[1] === '' || options_array[1] === 'undefined') {
      console.log("Syntax Error")
    } else {
      const filePath = path.resolve(filepath, options_array[0])
      try {
        fs.writeFileSync(filePath, options_array[1])
        console.log(`Written to ${filePath} successfully`)
      }  catch (err) {
        console.log("Error while writing file: ", err)
      }

    }


  } catch (err) {
    console.log("Directory Err: ", err)
  }
}

function createDir(filepath: string) {
  if (!fs.existsSync(filepath)) {
    fs.mkdirSync(filepath)
    console.log("The Directory has been made successfully")
  }
}

function createFile(filepath: string) {
  fs.openSync(filepath, 'w')
  console.log("An empty file is created")

}

if (options.ls) {
  const filePath = typeof options.ls === 'string' ? options.ls: __dirname;
  listDirContents(filePath)
}

if (options.mkdir) {
  createDir(path.resolve(__dirname, options.mkdir))
}

if (options.touch) {
  createFile(path.resolve(__dirname, options.touch))
}

if (options.read) {
  const filePath = typeof options.ls === 'string' ? options.ls: __dirname
  readContents(path.resolve(filePath, options.read))

}

if (options.write) {
  const filePath = typeof options.ls === 'string' ? options.ls: __dirname
  console.log("Options.write: ", options.write)
  writeContent(filePath, options.write)

}

if (!process.argv.slice(2).length) {
  program.outputHelp()
}





