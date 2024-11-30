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

async function editar(req, res) {
  var tamanho = req.body.tamanhoServer;
  var cidade = req.body.cidadeServer;
  var uf = req.body.ufServer;
  var cep = req.body.cepServer;
  var logradouro = req.body.logradouroServer;
  var status = req.body.statusServer;
  var idPropriedade = req.body.idPropriedadeServer;
  // Remover traço do CEP
  cep = cep.replace("-", '');
  try {
    const resultadoSelectP = await enderecoModel.selectEnderecoPropriedade(idPropriedade);
    // Verifica se mais de uma propriedade foi encontrada
    if (resultadoSelectP.length > 1) {
      console.log(resultadoSelectP.length + " Select P");
      return res.status(400).json({ mensagem: "Mais de uma propriedade encontrada" });
    }

    if (resultadoSelectP.length === 0) {
      return res.status(404).json({ mensagem: "Propriedade não encontrada" });
    }
    const idEndereco = resultadoSelectP[0].idEndereco;
    // Atualizar propriedade
    const resultadoPropriedade = await propriedadeModel.editar(
        tamanho || resultadoSelectP[0].tamanho,
        status || resultadoSelectP[0].status,
        idPropriedade
    );

    if (resultadoPropriedade.length > 0) {
      return res.status(500).json({ mensagem: "A edição da propriedade não foi concluída" });
    }

    // Atualizar endereço
    const resultadoEndereco = await enderecoModel.editarEnderecoPropriedade(
        cidade || resultadoSelectP[0].cidade,
        uf || resultadoSelectP[0].uf,
        cep || resultadoSelectP[0].cep,
        logradouro || resultadoSelectP[0].logradouro,
        idEndereco
    );

    if (resultadoEndereco.length > 0) {
      return res.status(500).json({ mensagem: "A edição do endereço não foi concluída" });
    }
    // Retorna sucesso se todas as operações foram concluídas
    return res.status(200).json({ mensagem: "Edição concluída com sucesso" });
  } catch (error) {
    console.error("Erro ao editar:", error);
    return res.status(500).json({ mensagem: "Erro interno no servidor" });
  }
}

module.exports = {
  buscar,
  cadastrar,
  editar
};
