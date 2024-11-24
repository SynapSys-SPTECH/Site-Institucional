var database = require("../database/config");

function buscarLongitudeLatitude(cidade) {
    var instrucaoSql = `SELECT leitura.latitude, leitura.longitude from leitura where municipio = "${cidade}" limit 1;`;

  return database.executar(instrucaoSql);
}


module.exports = {
    buscarLongitudeLatitude,

}
