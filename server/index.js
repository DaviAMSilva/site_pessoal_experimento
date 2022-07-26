/* eslint-env node */

const express = require("express");
const path = require("path");

const routes = require("./routes");

const server = express();
const port = process.env.PORT || 3001;

server.use(routes);
server.use(express.static(path.join(__dirname, "../build")));

server.listen(port, () => {
    console.log(`Escutando na porta: ${port}`);
});