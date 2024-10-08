var propriedadeModel = require("../models/propriedadeModel");
// var aquarioModel = require("../models/aquarioModel");

// function autenticar(req, res) {
//     var email = req.body.emailServer;
//     var senha = req.body.senhaServer;

//     if (email == undefined) {
//         res.status(400).send("Seu email está undefined!");
//     } else if (senha == undefined) {
//         res.status(400).send("Sua senha está indefinida!");
//     } else {

//         usuarioModel.autenticar(email, senha)
//             .then(
//                 function (resultadoAutenticar) {
//                     console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
//                     console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

//                     if (resultadoAutenticar.length == 1) {
//                         console.log(resultadoAutenticar);
// // TROCAR PARA UM POSSIVEL GERADOS DAS PROPRIEDADES CADASTRADAS **** 
//                         // aquarioModel.buscarAquariosPorEmpresa(resultadoAutenticar[0].empresaId)
//                         //     .then((resultadoAquarios) => {
//                         //         if (resultadoAquarios.length > 0) {
//                         //             res.json({
//                         //                 id: resultadoAutenticar[0].id,
//                         //                 email: resultadoAutenticar[0].email,
//                         //                 nome: resultadoAutenticar[0].nome,
//                         //                 senha: resultadoAutenticar[0].senha,
//                         //                 aquarios: resultadoAquarios
//                         //             });
//                         //         } else {
//                         //             res.status(204).json({ aquarios: [] });
//                         //         }
//                         //     })
//                     } else if (resultadoAutenticar.length == 0) {
//                         res.status(403).send("Email e/ou senha inválido(s)");
//                     } else {
//                         res.status(403).send("Mais de um usuário com o mesmo login e senha!");
//                     }
//                 }
//             ).catch(
//                 function (erro) {
//                     console.log(erro);
//                     console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
//                     res.status(500).json(erro.sqlMessage);
//                 }
//             );
//     }

// }

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var logradouro = req.body.logradouroServer;
    var tamanho = req.body.tamanhoServer;
    var cep = req.body.cepServer;
    var uf = req.body.ufServer;
    var cidade = req.body.cidadeServer;

    // Faça as validações dos valores
    if (tamanho == undefined) {
        res.status(400).send("Seu tamanho está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (uf == undefined) {
        res.status(400).send("Sua uf está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade a vincular está undefined!");
    } else if (logradouro == undefined) {
        res.status(400).send("Sua logradouro a vincular está undefined!");
    }else {

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        propriedadeModel.cadastrar(logradouro,tamanho, cep, cidade, uf)
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

module.exports = {
 //   autenticar,
    cadastrar
}