var database = require("../database/config");

function buscarLongitudeLatitude(cidade) {
  var instrucaoSql = `SELECT leitura.latitude, leitura.longitude from leitura where municipio = "${cidade}" limit 1;`;

  return database.executar(instrucaoSql);
}

function buscarPontosComPotencialDeExpansao(
  velocidadeMedia,
  tempoParaBuscaEmMeses
) {
  var instrucaoSql = `SELECT 
    latitude,
    longitude,
    municipio,
    estado,
    AVG(velocidadeHoraria) AS mediaVelocidade
FROM 
    leitura
WHERE 
    dataHora >= DATE_SUB(CURDATE(), INTERVAL ${tempoParaBuscaEmMeses} MONTH)
GROUP BY 
    latitude, 
    longitude, 
    municipio, 
    estado 
HAVING 
    AVG(velocidadeHoraria) > ${velocidadeMedia} 
ORDER BY 
    mediaVelocidade DESC;`;

  return database.executar(instrucaoSql);
}

module.exports = {
  buscarLongitudeLatitude,
  buscarPontosComPotencialDeExpansao
};
