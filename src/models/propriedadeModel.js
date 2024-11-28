var database = require("../database/config")

function buscar(id) {
    var instrucaoSql = `SELECT 
    endereco.cidade, 
    endereco.cep, 
    endereco.logradouro, 
    empresa.cnpj, 
    empresa.nomeFantasia, 
    propriedade.tamanho,
    propriedade.idPropriedade,
    propriedade.status,
    empresa.status as statusPropriedade
FROM 
    Synapsys.usuario AS usuario
INNER JOIN 
    Synapsys.empresa AS empresa 
    ON usuario.idUsuario = empresa.fk_usuario
INNER JOIN 
    Synapsys.propriedade AS propriedade 
    ON empresa.idEmpresa = propriedade.fk_empresa
INNER JOIN 
    Synapsys.endereco AS endereco 
    ON endereco.idEndereco = propriedade.fk_endereco
WHERE 
    usuario.idUsuario = ${id};
`;
  
    return database.executar(instrucaoSql);
  }


function cadastrar(cidade, UF, cep, logradouro,tamanho, fk_endereco, empresa) {
    console.log("ACESSEI O PROPRIEDADE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", logradouro, cep, cidade,UF, tamanho, fk_endereco, empresa);
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucaoSql = `

   
        INSERT INTO Synapsys.propriedade (tamanho, fk_endereco, fk_empresa) VALUES (${tamanho}, ${fk_endereco},${empresa});
        
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function editar(tamanho, status , fkDonoPropriedade){
    console.log("ACESSEI O PROPRIEDADE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t " +
        ">> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente." +
        " \n\n function editar():", tamanho , status , fkDonoPropriedade);

    const instrucaoSql = `
        UPDATE Synapsys.propriedade
        SET 
            tamanho = ${tamanho},
            status = '${status}',
            updateAt = CURRENT_TIMESTAMP
        WHERE 
            idPropriedade = ${fkDonoPropriedade};
    `;
    return database.executar(instrucaoSql);
}

function buscarPropriedade(idPropriedade){
    var instrucaoSql = `SELECT * FROM Synapsys.propriedade where idPropriedade = ${idPropriedade};`;

    return database.executar(instrucaoSql);
}

module.exports = {
    buscar,
    cadastrar,
    editar,
    buscarPropriedade
};