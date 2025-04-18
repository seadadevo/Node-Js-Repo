/**
 * 1- Entry File: the file you start project from
 *
 */

import * as http from "http";
import fs from "fs";
import path from "path";
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    fs.readFile("index.html", (err, data) => {
      if (err) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Internal Serveal Error");
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write("<div>");
        res.write("<h1> Ahmed is better than you </h1>");
        res.write("</div>");
        res.end(data);
      }
    });
  } else if (req.url === "/products/new") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write(`<html>
        <head>
          <title>Add new Product</title>
        </head>

        <body>
          <h2>Add new Product</h2>
          <form action = "/add-product" method ="POST">
            <label for = "title">Title:</label><br/>
            <input type = "text" id = "title" name = "title" required/> <br><br>
            <label for = "description">description:</label><br/>
            <textarea type = "text" id = "description" name = "description" required></textarea> <br><br>
            <button type= "submit">Add Product</button>
      </form>
        </body>
      </html>`);
    res.end();
  } else if (req.method === "POST" && req.url === "/add-product") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      const data = new URLSearchParams(body);
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write(`<div>
          <h1>Product has been added</h1>
          <h1>Title: ${data.get("title")}</h1>
          <h1>description: ${data.get("description")}</h1>
        </div>`);
      res.end("<h1>Product has been added</h1>");
    });
  } else if (req.url === "/products") {
    const productFilePath = path.join(__dirname, 'data', 'product.json')
    
    // ! ensureing file is exsist 
    fs.access(productFilePath,fs.constants.F_OK, (err) => {
      if(err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Product file not found.");
        return;
      }
      
      // ! read Content of file  
      fs.readFile(productFilePath, 'utf8', (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error reading the products file.");
          return;
        }
  
        try {
          const jsonProducts = JSON.parse(data);
          // ! Add new Product to array
          const submitedProduct = { id: 2, title: "product2" };
          jsonProducts.products.push(submitedProduct)
          const updatedData = JSON.stringify(jsonProducts)
          // ! Write new updated data to file
          fs.writeFile(productFilePath, updatedData, err => {
            console.log(err);
          })
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(jsonProducts))
        } catch (error) {
          res.writeHead(500, {'content-type': 'text/plain'})
          res.end('Error parsing the products file')
        }
      })

    })

    
  } else if (req.url === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("This is about Page");
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page not found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log("Server is running on http://localhost:3000");
});
