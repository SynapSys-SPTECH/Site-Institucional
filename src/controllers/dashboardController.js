var dashboardModel = require("../models/dashboardModel");

async function buscarLongitudeLatitude(req, res) {
    var cidade = req.params.cidadeEmpresa

    const respostaLongitudeLatitude = await dashboardModel.buscarLongitudeLatitude(cidade).then((respostaLongitudeLatitude) => {
        res.status(200).json(respostaLongitudeLatitude);
      });
}

async function buscarPontosComPotencialDeExpansao(req, res){
    var velocidadeMedia = req.params.velocidadeMedia;
    var tempoParaBuscaEmMeses = req.params.tempoParaBuscaEmMeses;

    const respostaPotencialExpansao = await dashboardModel.buscarPontosComPotencialDeExpansao(velocidadeMedia, tempoParaBuscaEmMeses).then((respostaPotencialExpansao) => {
        res.status(200).json(respostaPotencialExpansao);
    })
}


module.exports = {
    buscarLongitudeLatitude,
    buscarPontosComPotencialDeExpansao,
}