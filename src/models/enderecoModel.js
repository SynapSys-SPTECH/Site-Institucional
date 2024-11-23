var database = require("../database/config");



function cadastrar(cidade, UF, cep, numero, bairro, logradouro, complemento) {
  var instrucaoSql = `INSERT INTO endereco (cidade, UF, cep, numero, bairro, logradouro, complemento) VALUES ('${cidade}', '${UF}', '${cep}', ${numero}, '${bairro}', '${logradouro}', '${complemento}')`;

  return database.executar(instrucaoSql);
}


function cadastrarPropriedade(cidade, UF, cep, logradouro) {
    var instrucaoSql = `INSERT INTO endereco (cidade, UF, cep, logradouro, numero, bairro) VALUES ('${cidade}', '${UF}', '${cep}', '${logradouro}', "0", "N/A")`;
  
    return database.executar(instrucaoSql);
}

function listarEndereco(fkEndereco){
  var instrucaoSql = `SELECT * FROM endereco where idEndereco = ${fkEndereco}`;
  
  return database.executar(instrucaoSql);
}

module.exports = { cadastrar, cadastrarPropriedade, listarEndereco };