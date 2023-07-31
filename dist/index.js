#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const { Command } = require('commander');
const figlet = require("figlet");
const fs = require('fs');
const path = require('path');
const program = new Command();
console.log(figlet.textSync("FileMan"));
program
    .version("1.0.0")
    .description("An example CLI for managing a directory")
    .option("-l, --ls  [value]", "List directory contents")
    .option("-m, --mkdir <value>", "Create a directory")
    .option("-t, --touch <value>", "Create a file")
    .option("-r, --read <filename>, Read a file within a directory")
    .parse(process.argv);
const options = program.opts();
function listDirContents(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const files = yield fs.promises.readdir(filepath);
            console.log("Files: ", files);
            const detailedFilesPromises = files.map((file) => __awaiter(this, void 0, void 0, function* () {
                let fileDetails = yield fs.promises.lstat(path.resolve(filepath, file));
                const { size, birthtime } = fileDetails;
                return { filename: file, "size(KB)": size, created_at: birthtime };
            }));
            const detailedFailes = yield Promise.all(detailedFilesPromises);
            console.table(detailedFailes);
        }
        catch (err) {
            console.log("Error Occured while reading the directory: ", err);
        }
    });
}
function readContents(filepath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("File Path: ", filepath);
            try {
                const data = fs.readFileSync(filepath, 'utf8');
                console.log("Reading File: ", filepath);
                console.log('-------------------------------------------------------');
                console.log(data);
                console.log('-------------------------------------------------------');
            }
            catch (err) {
                console.log("Cannot Read File in Path: ", filepath);
                console.log(err);
            }
        }
        catch (err) {
            console.log("Error with Directory: ", err);
        }
    });
}
function createDir(filepath) {
    if (!fs.existsSync(filepath)) {
        fs.mkdirSync(filepath);
        console.log("The Directory has been made successfully");
    }
}
function createFile(filepath) {
    fs.openSync(filepath, 'w');
    console.log("An empty file is created");
}
if (options.ls) {
    const filePath = typeof options.ls === 'string' ? options.ls : __dirname;
    listDirContents(filePath);
}
if (options.mkdir) {
    createDir(path.resolve(__dirname, options.mkdir));
}
if (options.touch) {
    createFile(path.resolve(__dirname, options.touch));
}
if (options.read) {
    const filePath = typeof options.ls === 'string' ? options.ls : __dirname;
    readContents(path.resolve(filePath, options.read));
}
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
//# sourceMappingURL=index.js.map