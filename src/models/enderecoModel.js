var database = require("../database/config");



function cadastrar(cidade, UF, cep, numero, bairro, logradouro, complemento) {
  var instrucaoSql = `INSERT INTO endereco (cidade, UF, cep, numero, bairro, logradouro, complemento) VALUES ('${cidade}', '${UF}', '${cep}', ${numero}, '${bairro}', '${logradouro}', '${complemento}')`;

  return database.executar(instrucaoSql);
}

module.exports = { cadastrar };
