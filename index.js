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

//! Create Server & Routing & Building a simple API & Parsing variables from urls :
const http = require("http"); // The http module is a core module of Node designed to support many features of the HTTP protocol. Second, create an HTTP server.
const url = require("url");
const replaceTemplate = require("./modules/replaceTemplate");

//* Templates :
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  "utf-8"
);
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  "utf-8"
);
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  "utf-8"
);

//* Data :
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8"); // The "." refers to the directory from which we execute the node command in the terminal "__dirname" is always the directory in which the currently executing script resides
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  // const pathName = req.url;
  //* Extracting the query & pathname from the url object :
  const { query, pathname } = url.parse(req.url, true);

  //* The overview page :
  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "Content-type": "text/html" });

    const cardsHtml = dataObj
      .map((element) => replaceTemplate(tempCard, element))
      .join(""); //? At this sentence we create an array full of fulfilled templates which contains html cards after replacing all the dummy properties with the actual values extracted on the "dataObj" with the help of "replaceTemplate()", therefore at the end we convert this array into string so we can replace the "PRODUCTCARDS" with the final result of cardsHtml.
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardsHtml);

    res.end(output);

    //* The product page :
  } else if (pathname === "/product") {
    res.writeHead(200, { "Content-type": "text/html" });

    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);
    res.end(output);

    //* The api  :
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "Content-type": "application/json",
    });
    res.end(data);

    //* Not found page :
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
