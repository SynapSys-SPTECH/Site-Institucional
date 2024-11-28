var express = require("express");
var router = express.Router();

var dashboardController = require("../controllers/dashboardController");

router.get("/buscarLongitudeLatitude/:cidadeEmpresa", function (req, res) {
    dashboardController.buscarLongitudeLatitude(req, res);
});

router.get("/buscarPontosComPotencialDeExpansao/:velocidadeMedia/:tempoParaBuscaEmMeses", function (req, res) {
    dashboardController.buscarPontosComPotencialDeExpansao(req, res);
});

module.exports = router;