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
    AVG(CASE WHEN velocidadeHoraria > 0 THEN velocidadeHoraria END) AS mediaVelocidade
FROM 
    leitura
WHERE 
    dataHora >= DATE_SUB(CURDATE(), INTERVAL ${tempoParaBuscaEmMeses} MONTH)
GROUP BY 
    latitude, 
    longitude, 
    municipio, 
    estado -- Agrupar por localidade
HAVING 
    mediaVelocidade > ${velocidadeMedia}
ORDER BY 
    mediaVelocidade DESC; `;

  return database.executar(instrucaoSql);
}

function buscarMesesComMaisDiasFavoraveis() {
  var instrucaoSql = `SELECT 
    municipio,
    DATE_FORMAT(dataHora, '%Y-%m') AS ano_mes,
    COUNT(*) AS total,
	AVG(CASE WHEN velocidadeHoraria > 0 THEN velocidadeHoraria END) AS mediaVelocidade
FROM 
    leitura
WHERE
    velocidadeHoraria > 6 AND
    dataHora >= DATE_SUB(CURDATE(), INTERVAL 24 MONTH) -- Últimos 24 meses
GROUP BY 
    municipio, ano_mes
HAVING
	mediaVelocidade > 4.5
ORDER BY 
    municipio, total DESC
LIMIT
	5;`;

  return database.executar(instrucaoSql);
}

function diasComVentosAcimaDoLimite() {
  var instrucaoSql = `SELECT 
    DATE(dataHora) AS dia,
    AVG(CASE WHEN velocidadeHoraria > 0 THEN velocidadeHoraria END) AS mediaVelocidade
FROM 
    leitura
WHERE 
    dataHora >= DATE_SUB(CURDATE(), INTERVAL 7 MONTH) -- Últimos 24 meses
GROUP BY 
    dia
HAVING 
    mediaVelocidade > 6 -- Média maior que 6
ORDER BY 
    dia DESC;`;

    return database.executar(instrucaoSql);
}

module.exports = {
  buscarLongitudeLatitude,
  buscarPontosComPotencialDeExpansao,
  buscarMesesComMaisDiasFavoraveis,
  diasComVentosAcimaDoLimite
};
