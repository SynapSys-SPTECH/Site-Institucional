var enderecoModel = require("../models/enderecoModel");
var empresaController = require("../controllers/empresaController")

function cadastrar(req, res) {
  var cidade = empresaController.cadastrar().cidade;
  var UF = empresaController.cadastrar().uf;
  var cep = empresaController.cadastrar().cep;
  var numero = empresaController.cadastrar().numero;
  var logradouro = empresaController.cadastrar().logradouro;
  var complemento = empresaController.cadastrar().complemento;

  enderecoModel
    .cadastrar(cidade, UF, cep, numero, logradouro, complemento)
    .then((resultado) => {
      res.status(201).json(resultado);
    });
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
};
