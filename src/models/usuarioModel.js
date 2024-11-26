var database = require("../database/config")

function autenticar(email, senha) {
    console.log(" \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, telefone ,email, senha, tipo) {
    console.log("\n\n function cadastrar():", nome , telefone, email, senha, tipo);
    var instrucaoSql = `
        INSERT INTO usuario (nome , telefoneContato , email , senha, fktipo, createAt) VALUES ( '${nome}', '${telefone}', '${email}', '${senha}', '${tipo}', now());
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}

function deletar(idUsuario) {
    console.log("\n\n function deletar():", idUsuario);
    var instrucaoSql = `
        UPDATE usuario
        set status = 'desabilito'
        where idUsuario = '${idUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}

function editar(nome , email , idUsuario) {
    console.log("\n\n function atualizar():", idUsuario , nome , email);
    var instrucaoSql = `
        UPDATE usuario
        set nome = '${nome}', email = '${email}'
        where idUsuario = '${idUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}

function editarSenha(senha, idUsuario) {
    var instrucaoSql = `
        UPDATE usuario
        set senha = '${senha}'
        where idUsuario = '${idUsuario}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql); 
}

function verificarEmail(email) {
    var instrucaoSql = `
        SELECT email FROM usuario WHERE email = '${email}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}
function buscarPorEmail(email) {
    const instrucaoSql = `
        SELECT * FROM usuario WHERE email = '${email}';
    `;
    return database.executar(instrucaoSql); 
}


module.exports = {
    autenticar,
    cadastrar,
    deletar,
    editar,
    editarSenha,
    verificarEmail,
    buscarPorEmail
};