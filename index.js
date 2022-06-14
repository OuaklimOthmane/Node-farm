//! Core modules :
//* REPL :
//?  Node. js Read-Eval-Print-Loop (REPL) is an easy-to-use command-line tool, used for processing Node. js expressions. It captures the user's JavaScript code inputs, interprets, and evaluates the result of this code.
//? We type in the cli "node" in case of opening the repl, however we cole it by typing ".exit" or by just entering "ctrl+d".

//? We execute a script file by typing "node file.js "

//? we use the "_" in the repl to refer in the last getting output. // (1 + 1 = 2) ||| ( _ + 1 = 3)

//* "fs" module :
const fs = require("fs"); // The built-in Node. js "file system" module helps us store, access, and manage data on our operating system. Commonly used features of the fs module include fs. readFile to read data from a file, fs.
const { exitCode } = require("process");

//* Reading file :
const textIn = fs.readFileSync("./txt/append.txt", "utf-8"); //? "fs.readFileSync()" Method is an inbuilt api of fs module which is used to read the file and return its content. it accepts 2 arguments are the "path" of the file and "encoding" type.
console.log(textIn);

//* Writing in file :
const textOut = `This is what we know about the avocado : ${textIn}\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/Output.txt", textOut); //  fs. writeFileSync() creates a new file if the specified file does not exist.
console.log("file written !");
