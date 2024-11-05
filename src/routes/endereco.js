var express = require("express");
var router = express.Router();

var enderecoController = require("../controllers/enderecoController");


router.post("/cadastrar", function (req, res) {
    enderecoController.cadastrar(req, res);
})

router.post("/cadastrarPropriedade", function (req, res) {
    enderecoController.cadastrarPropriedade(req, res);
})


module.exports = router;