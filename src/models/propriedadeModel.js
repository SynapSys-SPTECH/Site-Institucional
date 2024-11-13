var database = require("../database/config")

//function autenticar(email, senha) {
//    console.log("ACESSEI O PROPRIEDADE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
//    var instrucaoSql = `
//      SELECT id, nome, email, fk_empresa as empresaId FROM usuario WHERE email = '${email}' AND senha = '${senha}';
//    `;
    //console.log("Executando a instrução SQL: \n" + instrucaoSql);
  //  return database.executar(instrucaoSql);
//}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
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

function listar() {
    var instrucaoSql = `
   
    select idPropriedade,tamanho,logradouro, cep, uf,cidade 
from synapsys.propriedade proprie
join synapsys.endereco ende
on proprie.idPropriedade = ende.fkDonoPropriedade
where fk_empresa = 1`;
  
    return database.executar(instrucaoSql);
  }

  function deletar() {
    console.log("ACESSEI O AVISO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function deletar():", idAviso);
    var instrucaoSql = `
        DELETE FROM synapsys.propriedade WHERE id = 1;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


module.exports = {
//    autenticar,
    cadastrar,
    listar,
    deletar
};