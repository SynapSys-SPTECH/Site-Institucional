var express = require("express");
var router = express.Router();

var propriedadeController = require("../controllers/propriedadeController");

router.post("/cadastrarPropriedade", function (req, res) {
    propriedadeController.cadastrar(req, res);
})

// router.post("/autenticar", function (req, res) {
//     propriedadeController.autenticar(req, res);
// });

module.exports = router;