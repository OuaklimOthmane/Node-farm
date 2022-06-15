//! Core modules :
//* REPL :
//?  Node. js Read-Eval-Print-Loop (REPL) is an easy-to-use command-line tool, used for processing Node. js expressions. It captures the user's JavaScript code inputs, interprets, and evaluates the result of this code.
//? We type in the cli "node" in case of opening the repl, however we cole it by typing ".exit" or by just entering "ctrl+d".

//? We execute a script file by typing "node file.js "

//? we use the "_" in the repl to refer in the last getting output. // (1 + 1 = 2) ||| ( _ + 1 = 3)

//* "fs" module :
const fs = require("fs"); // The built-in Node. js "file system" module helps us store, access, and manage data on our operating system. Commonly used features of the fs module include fs. readFile to read data from a file.

//! Blocking, synchronous way :
/* 
//* Reading file :
const textIn = fs.readFileSync("./txt/append.txt", "utf-8"); //? "fs.readFileSync()" Method is an inbuilt api of fs module which is used to read the file and return its content. it accepts 2 arguments are the "path" of the file and "encoding" type.
console.log(textIn);

//* Writing in file :
const textOut = `This is what we know about the avocado : ${textIn}\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/Output.txt", textOut); //  fs. writeFileSync() creates a new file if the specified file does not exist.
console.log("file written !");
 */

//! Non-Blocking, asynchronous way :
//* example :
/* 
fs.readFile("./txt/start.txt", "utf-8", (error, data) => {
  console.log(data);
});
console.log("Will read file !"); 
*/
//? Output : "Will read file !" then "Read-this" => So Node.js will start reading the file in the background, therefore will not block the code and will then immediately move on to the next line of code. Only then when the file is completely read then the callback function will run.

//* Callback Hell :
//? Node.js is built around the philosophy of calling callbacks as soon as finish the task to implement asynchronous operations.
/* 
fs.readFile("./txt/start.txt", "utf-8", (error, data1) => {
  fs.readFile(`./txt/${data1}.txt`, "utf-8", (error, data2) => {
    fs.readFile(`./txt/append.txt`, "utf-8", (error, data3) => {
      console.log(data3);
      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, "utf-8", (err) => {
        console.log("file has been written !!");
      });
    });
  });
});
console.log("Will read file !");
*/

//! Server & Routing :
//* Create web-server :
const http = require("http"); // The http module is a core module of Node designed to support many features of the HTTP protocol. Second, create an HTTP server

const url = require("url");

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/" || pathName === "/overview") {
    res.end("the overview page !!");
  } else if (pathName === "/product") {
    res.end("the product page !!");
  } else {
    res.writeHeader(404, {
      "content-type": "text/html",
      "my-own-header": "Hello World",
    }); // The "res.writeHead(errorCode,headers)" method is for returning a status code to the browser, and the browser will throw an error if it is a client-side status code or server-side status code

    res.end("<h1>Page not found !</h1>");
  }
});

//* Listen to the coming requests :
server.listen(8000, "127.0.0.1", () =>
  console.log("Listening to requests on port 8000")
); // "server.listen()" method creates a listener on the specified port or path, it takes as arguments the port, the path, and an optional argument which is a callback function executed when the server has opened.
