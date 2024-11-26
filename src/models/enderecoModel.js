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

function editarEndereco(idEndereco, cidade, cep, uf, numero, bairro, logradouro, complemento) {
    console.log("Atualizando endereço com os dados:", { idEndereco, cidade, cep, uf, numero, bairro, logradouro, complemento });

    const instrucaoEndereco = `
        UPDATE Synapsys.endereco
        SET cidade = '${cidade}',
            cep = '${cep}',
            uf = '${uf}',
            numero = ${numero},
            bairro = '${bairro}',
            logradouro = '${logradouro}',
            complemento = '${complemento}',
            updateAt = CURRENT_TIMESTAMP
        WHERE idEndereco = ${idEndereco};
    `;

    console.log("Instrução SQL para endereço:\n", instrucaoEndereco);

    // Executa a query de atualização do endereço
    return database.executar(instrucaoEndereco);
}


module.exports = { cadastrar, cadastrarPropriedade, listarEndereco , editarEndereco };