"use strict";
/**
 * 1- Entry File: the file you start project from
 *
 */
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
// const fs = require("fs");
var fs_1 = require("fs");
var server = http.createServer(function (req, res) {
    if (req.url === "/") {
        fs_1.default.readFile("index.html", function (err, data) {
            if (err) {
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end('Internal Serveal Error');
            }
            else {
                res.writeHead(200, { "Content-Type": "text/html" });
                res.write("<div>");
                res.write("<h1> Ahmed is better than you </h1>");
                res.write("</div>");
                res.end(data);
            }
        });
    }
    else if (req.url === "/products") {
        res.writeHead(200, { "Content-Type": "application/json" });
        var data = {
            products: [
                { id: 2, title: "product2" },
                { id: 3, title: "product3" },
                { id: 4, title: "product4" },
                { id: 4, title: "product5" },
                { id: 4, title: "product6" },
            ]
        };
        res.write(JSON.stringify(data));
        res.end();
    }
    else if (req.url === "/about") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("This is about Page");
    }
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 - Page not found");
    }
});
server.listen(3000, function () {
    console.log("Server is running on http://localhost:3000");
});
