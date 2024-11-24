var dashboardModel = require("../models/dashboardModel");

async function buscarLongitudeLatitude(req, res) {
    var cidade = req.params.cidadeEmpresa

    const respostaLongitudeLatitude = await dashboardModel.buscarLongitudeLatitude(cidade).then((respostaLongitudeLatitude) => {
        res.status(200).json(respostaLongitudeLatitude);
      });
}




module.exports = {
    buscarLongitudeLatitude,
}