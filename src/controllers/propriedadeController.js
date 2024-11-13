var propriedadeModel = require("../models/propriedadeModel");
var enderecoModel = require("../models/enderecoModel")




async function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var logradouro = req.body.logradouroServer;
    var tamanho = req.body.tamanhoServer;
    var cep = req.body.cepServer;
    var UF = req.body.ufServer;
    var cidade = req.body.cidadeServer;

    // Faça as validações dos valores
    if (tamanho == undefined) {
        res.status(400).send("Seu tamanho está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    } else if (UF == undefined) {
        res.status(400).send("Sua uf está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade a vincular está undefined!");
    } else if (logradouro == undefined) {
        res.status(400).send("Sua logradouro a vincular está undefined!");
    }else {


        const resultadoEndereco = await enderecoModel.cadastrarPropriedade(cidade, UF, cep, logradouro);
        console.log(resultadoEndereco)
        const fk_endereco = resultadoEndereco.insertId;

        // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
        await propriedadeModel.cadastrar(cidade, UF, cep, logradouro,tamanho, fk_endereco)

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

function listar(req, res) {
  
    propriedadeModel.listar.then((resultado) => {
      res.status(200).json(resultado);
    });
  }

  function editar(req, res) {
    var logradouro = req.body.logradouro;
    var tamanho = req.body.tamanho;
    var cep = req.body.cep;
    var cidade = req.body.cidade;
    var uf = req.body.uf;
    var idPropriedade = req.params.idPropriedade;

    propriedadeModel.editar(logradouro, tamanho,cep, cidade, uf, idPropriedade)
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

function deletar(req, res) {
    var idPropriedade = req.params.idPropriedade;

    propriedadeModel.deletar(idPropriedade)
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


module.exports = {

    cadastrar,
    listar,
    editar,
    deletar

}