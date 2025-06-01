const http = require("http");
const { readFileSync, readFile } = require("fs");

const home = readFile("./index.html");


const server = http.createServer((req, res) => {
    if (req.url == "/") {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(home);
        res.end();
    } else if (req.url == "/features") {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(features);
        res.end();

    }
    else if (req.url == "/get-started") {
        res.writeHead(200, { "content-type": "text/html" });
        res.write(get_started);
        res.end();

    }
});

server.listen(3000, () => {
    console.log("Server is listening on port 3000...");
});
