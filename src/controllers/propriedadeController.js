var propriedadeModel = require("../models/propriedadeModel");
var enderecoModel = require("../models/enderecoModel");

async function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  var logradouro = req.body.logradouroServer;
  var tamanho = req.body.tamanhoServer;
  var cep = req.body.cepServer;
  var UF = req.body.ufServer;
  var cidade = req.body.cidadeServer;
  var empresa = req.body.empresaServer

  const resultadoEndereco = await enderecoModel.cadastrarPropriedade(
    cidade,
    UF,
    cep,
    logradouro
  );
  console.log(resultadoEndereco);
  const fk_endereco = resultadoEndereco.insertId;

  // Passe os valores como parâmetro e vá para o arquivo usuarioModel.js
  await propriedadeModel
    .cadastrar(cidade, UF, cep, logradouro, tamanho, fk_endereco, empresa)

    .then(function (resultado) {
      res.json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      console.log(
        "\nHouve um erro ao realizar o cadastro! Erro: ",
        erro.sqlMessage
      );
      res.status(500).json(erro.sqlMessage);
    });
}

async function buscar(req, res) {
  var id = req.params.idUserVar;

  const respostaPropriedade = await propriedadeModel
    .buscar(id)
    .then((respostaPropriedade) => {
      res.status(200).json(respostaPropriedade);
      console.log("respostaPropriedade ->", respostaPropriedade)
    });
}

module.exports = {
  buscar,
  cadastrar,
};
