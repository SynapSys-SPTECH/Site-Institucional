var database = require("../database/config")

function buscar(id) {
    var instrucaoSql = `SELECT endereco.cep, endereco.cidade, empresa.nomeFantasia, empresa.cnpj FROM endereco inner join propriedade on endereco.idEndereco = propriedade.fk_endereco where propriedade.fk_empresa = '${id}'`;
  
    return database.executar(instrucaoSql);
  }


function cadastrar(cidade, UF, cep, logradouro,tamanho, fk_endereco) {
    console.log("ACESSEI O PROPRIEDADE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", logradouro, cep, cidade,UF, tamanho, fk_endereco);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `

   
        INSERT INTO Synapsys.propriedade (tamanho, fk_endereco, fk_empresa) VALUES (${tamanho}, ${fk_endereco},${1});
        
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);




    return database.executar(instrucaoSql);
}

module.exports = {
    buscar,
    cadastrar
};