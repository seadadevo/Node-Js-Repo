/**
 * 1- Entry File: the file you start project from
 *
 */

import * as http from "http";
import fs, {promises as fsPromises} from "fs";
import path from "path";
const server = http.createServer((req, res) => {
  const productFilePath = path.join(__dirname, "data", "product.json");
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
  } else if (req.url === "/products") {
    // ! ensureing file is exsist
    fs.access(productFilePath, fs.constants.F_OK, (err) => {
      if (err) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Product file not found.");
        return;
      }

      // ! read Content of file
      fs.readFile(productFilePath, "utf8", (err, data) => {
        if (err) {
          res.writeHead(500, { "Content-Type": "text/plain" });
          res.end("Error reading the products file.");
          return;
        }

        try {
          const jsonProducts = JSON.parse(data);

          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(jsonProducts));
        } catch (error) {
          res.writeHead(500, { "content-type": "text/plain" });
          res.end("Error parsing the products file");
        }
      });
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
    req.on("end", async () => {
      const data = new URLSearchParams(body);
      const title = data.get("title");
      const description = data.get("description");

      try {
        const jsonData = await fsPromises.readFile(productFilePath, "utf8")
        const jsonProducts = JSON.parse(jsonData);
        jsonProducts.products.push({
          id: jsonProducts.products.length + 1,
          title: title as string,
          description: description as string,
        })
        const updatedData = JSON.stringify(jsonProducts, null, 2);
        await fsPromises.writeFile(productFilePath, updatedData, {flag: "w"})
      } catch (error) {
        console.log(error)
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write(`<div>
          <h1>Product has been added</h1>
          <h1>Title: ${title}</h1>
          <h1>description: ${description}</h1>
        </div>`);
      res.end();
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
