var propriedadeModel = require("../models/propriedadeModel");
var enderecoModel = require("../models/enderecoModel");

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
  } else {
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
      .cadastrar(cidade, UF, cep, logradouro, tamanho, fk_endereco)

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
}

async function buscar(req, res) {
  var id = req.params.idUserVar;

  const respostaPropriade = await propriedadeModel
    .buscar(id)
    .then((respostaPropriade) => {
      res.status(200).json(respostaPropriade);
    });
}

module.exports = {
  buscar,
  cadastrar,
};
