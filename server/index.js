const express = require("express");
const path = require("path");

const server = express();
const port = process.env.PORT || 3001;

server.use(express.static(path.join(__dirname, "../build")));

server.use((req, res) => {
    res.sendFile(path.join(__dirname, "../build/index.html"));
});

server.listen(port, () => {
    console.log(`Escutando na porta: ${port}`);
});