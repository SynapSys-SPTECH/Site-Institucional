var database = require("../database/config");



function cadastrar(cidade, UF, cep, numero, bairro, logradouro, complemento) {
  var instrucaoSql = `INSERT INTO endereco (cidade, UF, cep, numero, bairro, logradouro, complemento) VALUES ('${cidade}', '${UF}', '${cep}', ${numero}, '${bairro}', '${logradouro}', '${complemento}')`;

  return database.executar(instrucaoSql);
}


function cadastrarPropriedade(cidade, UF, cep, logradouro) {
    var instrucaoSql = `INSERT INTO endereco (cidade, UF, cep, logradouro) VALUES ('${cidade}', '${UF}', '${cep}', '${logradouro}')`;
  
    return database.executar(instrucaoSql);
}

module.exports = { cadastrar, cadastrarPropriedade };