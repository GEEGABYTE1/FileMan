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








