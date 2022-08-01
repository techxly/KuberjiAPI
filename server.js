const http = require("http");
const app = require("./app");
const port = process.env.port || 8700;
const server = http.createServer();
server.listen(port);