var database = require("../database/config");

function buscar(id) {
  var instrucaoSql = `SELECT empresa.idEmpresa, endereco.cep, endereco.cidade, empresa.nomeFantasia, empresa.cnpj FROM endereco inner join empresa on endereco.idEndereco = empresa.fk_endereco where empresa.fk_usuario = '${id}'`;

  return database.executar(instrucaoSql);
}

function listar() {
  var instrucaoSql = `SELECT id, razao_social, cnpj, codigo_ativacao FROM empresa`;

  return database.executar(instrucaoSql);
}

function buscarPorCnpj(cnpj) {
  var instrucaoSql = `SELECT * FROM empresa WHERE cnpj = '${cnpj}'`;

  return database.executar(instrucaoSql);
}

function cadastrar(razaoSocial, cnpj, inscricaoEstadual, nomeFantasia, fkEndereco, id) {
  var instrucaoSql = `INSERT INTO empresa (razaoSocial, cnpj, inscricaoEstadual, nomeFantasia, fk_endereco, fk_usuario) VALUES ('${razaoSocial}', '${cnpj}', '${inscricaoEstadual}', '${nomeFantasia}', ${fkEndereco}, ${id})`;

  return database.executar(instrucaoSql);
}

module.exports = { buscarPorCnpj, buscar, cadastrar, listar };
