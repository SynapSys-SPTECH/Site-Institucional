var express = require("express");
var router = express.Router();

var propriedadeController = require("../controllers/propriedadeController");

router.post("/cadastrar", function (req, res) {
    propriedadeController.cadastrar(req, res);
})

router.get("/buscar/:idUserVar", function (req, res) {
    propriedadeController.buscar(req, res);
})


module.exports = router;    