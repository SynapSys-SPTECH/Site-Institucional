var express = require("express");
var router = express.Router();

var propriedadeController = require("../controllers/propriedadeController");

router.post("/cadastrar", function (req, res) {
    console.log("Rota cadastrar atiginda")
    propriedadeController.cadastrar(req, res);
})


router.get("/listar", function (req, res) {
    console.log("Rota listar atiginda")
    propriedadeController.cadastrar(req, res);
})

router.put("/editar/:idPropriedade", function (req, res) {
    console.log("Rota editar atiginda")

    avisoController.editar(req, res);
});

router.delete("/deletar", function (req, res) {
    console.log("Rota deletar atiginda")

    avisoController.deletar(req, res);
});



module.exports = router;    