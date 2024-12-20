var empresaModel = require("../models/empresaModel");
var enderecoModel = require("../models/enderecoModel")

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

async function cadastrar(req, res) {
  var cnpj = req.body.cnpjServer;
  var razaoSocial = req.body.razaoSocialServer;
  var inscricaoEstadual = req.body.ieServer;
  var nomeFantasia = req.body.nomeFantasiaServer;
  var cidade = req.body.cidadeServer;
  var uf = req.body.ufServer;
  var cep = req.body.cepServer;
  var numero = req.body.numeroServer;
  var bairro = req.body.bairroServer
  var logradouro = req.body.logradouroServer;
  var complemento = req.body.complementoServer;

  const resultado = await empresaModel.buscarPorCnpj(cnpj);
    if (resultado.length > 0) {
      return res.status(401).json({ mensagem: `A empresa com o CNPJ ${cnpj} já existe` });
    }

    const resultadoEndereco = await enderecoModel.cadastrar(cidade, uf, cep, numero, bairro, logradouro, complemento);
    console.log(resultadoEndereco)
    const fkEndereco = resultadoEndereco.insertId;

    const resultadoEmpresa = await empresaModel.cadastrar(razaoSocial, cnpj, inscricaoEstadual, nomeFantasia, fkEndereco);
    res.status(201).json(resultadoEmpresa);
    
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
};
