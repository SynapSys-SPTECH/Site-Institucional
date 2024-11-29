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

async function buscarMesesComMaisDiasFavoraveis(req, res) {
    const respostaDiasFavoraveis = await dashboardModel.buscarMesesComMaisDiasFavoraveis().then((respostaDiasFavoraveis) => {
        res.status(200).json(respostaDiasFavoraveis);
    })
}

async function diasComVentosAcimaDoLimite(req, res){
    const respostaDiasComVentosAcima = await dashboardModel.diasComVentosAcimaDoLimite().then((respostaDiasComVentosAcima) => {
        res.status(200).json(respostaDiasComVentosAcima);
    })
}

module.exports = {
    buscarLongitudeLatitude,
    buscarPontosComPotencialDeExpansao,
    buscarMesesComMaisDiasFavoraveis,
    diasComVentosAcimaDoLimite
}