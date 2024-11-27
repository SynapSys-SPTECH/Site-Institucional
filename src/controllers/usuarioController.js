var usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
    const { emailServer, senhaServer } = req.body; 


    if (!emailServer || !senhaServer) {
        return res.status(400).send("Por favor, informe o email e a senha.");
    }


    usuarioModel.buscarPorEmail(emailServer)
        .then((resultado) => {
            if (resultado.length === 0) {
                return res.status(404).send("Email não encontrado.");
            }


            if (resultado[0].senha !== senhaServer) {
                return res.status(403).send("Senha incorreta.");
            }

            res.json({
                idUsuario: resultado[0].idUsuario,
                email: resultado[0].email,
                fktipo: resultado[0].fktipo,
                nome: resultado[0].nome
            });
        })
        .catch((erro) => {
            console.log(erro);
            res.status(500).send("Erro ao processar a autenticação.");
        });
}

function cadastrar(req, res) {
    var tipo = req.body.tipoServer;
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;
    var tipo = req.body.tipoServer;
    var telefone = req.body.telefoneServer;
    var nome = req.body.nomeServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (tipo == undefined) {
        res.status(400).send("Seu tipoUser está undefined!");
    } else {

        usuarioModel.cadastrar(nome, telefone , email, senha, tipo)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function deletar(req, res) {
    var idUsuario = req.params.idUsuario;
    var novaCampo = req.body.descricao;

    usuarioModel.deletar(idUsuario, novaCampo)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao deletar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function editar(req, res) {
    var nome = req.body.nomeServer;
    var email = req.body.emailServer;
    var idUsuario = req.body.idServer;

    usuarioModel.editar(nome , email, idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}

function editarSenha(req, res) {
    var senha = req.body.senhaServer;
    var idUsuario = req.body.idServer;

    usuarioModel.editarSenha(senha, idUsuario)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        )
        .catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar o post: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );

}
function verificarEmail(req, res) {
    var email = req.body.emailServer;

    if (email == undefined) {
        res.status(400).send("O e-mail está undefined!");
    } else {
        usuarioModel.verificarEmail(email)
            .then(function (resultado) {
                if (resultado.length > 0) {
                    
                    res.status(409).send("E-mail já existe.");
                } else {
                    
                    res.status(200).send("E-mail disponível.");
                }
            })
            .catch(function (erro) {
                console.log(erro);
                res.status(500).json(erro.sqlMessage);
            });
    }
}

module.exports = {
    autenticar,
    cadastrar,
    deletar,
    editar,
    editarSenha,
    verificarEmail
}