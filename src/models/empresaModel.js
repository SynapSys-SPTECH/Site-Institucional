var database = require("../database/config");

function buscar(id) {
  var instrucaoSql = `SELECT empresa.idEmpresa, endereco.cep, endereco.cidade, empresa.nomeFantasia, empresa.cnpj, empresa.status FROM endereco inner join empresa on endereco.idEndereco = empresa.fk_endereco where empresa.fk_usuario = '${id}'`;

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

function editarEmpresa(idEmpresa, razaoSocial, nomeFantasia , status) {
  console.log("Atualizando empresa com os dados:", { idEmpresa, razaoSocial, nomeFantasia, status});

  const instrucaoEmpresa = `
        UPDATE Synapsys.empresa
        SET status = '${status}',
            razaoSocial = '${razaoSocial}',
            nomeFantasia = '${nomeFantasia}',
            updateAt = CURRENT_TIMESTAMP
        WHERE idEmpresa = ${idEmpresa};
    `;

  console.log("Instrução SQL para empresa:\n", instrucaoEmpresa);

  // Executa a query de atualização da empresa
  return database.executar(instrucaoEmpresa);
}

function buscarStatusEmpresa(idEmpresa){
  const instrucaoSQL = `
  SELECT status FROM empresa where idEmpresa = ${idEmpresa}`

  return database.executar(instrucaoSQL);
}

module.exports = { buscarPorCnpj, buscar, cadastrar, listar, editarEmpresa, buscarStatusEmpresa };
