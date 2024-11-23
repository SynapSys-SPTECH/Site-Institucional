var enderecoModel = require("../models/enderecoModel");
var propriedadeController = require("../controllers/propriedadeController")

function cadastrar(req, res) {
  var cidade =  propriedadeController.cadastrar().cidade;
  var UF = propriedadeController.cadastrar().uf;
  var cep = propriedadeController.cadastrar().cep;
  var numero = propriedadeController.cadastrar().numero;
  var logradouro = propriedadeController.cadastrar().logradouro;
  var complemento = propriedadeController.cadastrar().complemento;

  enderecoModel.cadastrar(cidade, UF, cep, numero, logradouro, complemento)
    .then((resultadoEndereco) => {
      res.status(201).json(resultadoEndereco);
    });
}



function cadastrarPropriedade(req, res) {
    let cidade =  propriedadeController.cadastrar().cidade;
    let UF = propriedadeController.cadastrar().uf;
    let cep = propriedadeController.cadastrar().cep;
    let logradouro = propriedadeController.cadastrar().logradouro;
  
    enderecoModel.cadastrar(cidade, UF, cep, logradouro)
      .then((resultado) => {
        res.status(201).json(resultado);
      });
  }

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  cadastrarPropriedade,
  listar,
};