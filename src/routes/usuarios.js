var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.put("/deletar/:idUsuario", function (req, res) {
    usuarioController.deletar(req, res);
});

router.put("/editar/:idUsuario", function (req, res) {
    usuarioController.editar(req, res);
});

router.put("/editarSenha/:idUsuario", function (req, res) {
    usuarioController.editarSenha(req, res);
});


module.exports = router;