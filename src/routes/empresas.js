var express = require("express");
var router = express.Router();

var empresaController = require("../controllers/empresaController");


router.post("/cadastrar", function (req, res) {
    empresaController.cadastrar(req, res);
})

router.get("/buscar", function (req, res) {
    empresaController.buscarPorCnpj(req, res);
});

router.get("/buscar/:idUserVar", function (req, res) {
  empresaController.buscar(req, res);
});

router.get("/listar", function (req, res) {
  empresaController.listar(req, res);
});

router.put("/editar/:cnpj", function (req, res) {
    empresaController.editar(req, res);
});

module.exports = router;