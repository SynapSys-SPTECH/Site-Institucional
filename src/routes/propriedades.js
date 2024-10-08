var express = require("express");
var router = express.Router();

var propriedadeController = require("../controllers/propriedadeController");

router.post("/cadastrar", function (req, res) {
    console.log("Rota cadastrar atiginda")
    propriedadeController.cadastrar(req, res);
})

// router.post("/autenticar", function (req, res) {
//     propriedadeController.autenticar(req, res);
// });

module.exports = router;    