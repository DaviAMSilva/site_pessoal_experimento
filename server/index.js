const express = require("express");
const server = express();
const path = require("path");

const port = process.env.PORT || 3000;

server.use(express.static(path.join(__dirname, "..", "build")));

server.listen(port, () => {
    console.log(`Escutando na porta: ${port}`);
})