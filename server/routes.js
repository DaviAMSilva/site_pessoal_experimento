const express = require("express");
const path = require("path");

const router = express.Router();

router.get("/:url", (req, res) => {
    const url = req.params.url;

    const homePaths = [
        "", "sobre", "projetos", "contato"
    ];

    if (homePaths.includes(url)) {
        res.sendFile(path.join(__dirname, "../build/index.html"));
    }
});

module.exports = router;