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
function cadastrar(logradouro,tamanho, cep, uf, cidade) {
    console.log("ACESSEI O PROPRIEDADE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", tamanho, logradouro, cep, cidade,uf);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `

       INSERT INTO Synapsys.endereco (logradouro, cep, uf, cidade) 
 VALUES  ('${logradouro}',${cep}, '${cidade}', '${uf}');


        INSERT INTO Synapsys.propriedade (tamanho) VALUES (${tamanho}, );
        
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
//    autenticar,
    cadastrar
};