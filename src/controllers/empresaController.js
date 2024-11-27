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

async function buscar(req, res) {
  var id = req.params.idUserVar;

  const respostaEmpresa = await empresaModel.buscar(id).then((respostaEmpresa) => {
    res.status(200).json(respostaEmpresa);
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
  var id = req.body.idServer;

  const resultado = await empresaModel.buscarPorCnpj(cnpj);
    if (resultado.length > 0) {
      return res.status(401).json({ mensagem: `A empresa com o CNPJ ${cnpj} já existe` });
    }

    const resultadoEndereco = await enderecoModel.cadastrar(cidade, uf, cep, numero, bairro, logradouro, complemento);
    console.log(resultadoEndereco)
    const fkEndereco = resultadoEndereco.insertId;

    const resultadoEmpresa = await empresaModel.cadastrar(razaoSocial, cnpj, inscricaoEstadual, nomeFantasia, fkEndereco, id);
    res.status(201).json(resultadoEmpresa);
    
}

async function editar(req, res) {
  try {
    const {
      idEmpresaServer: idEmpresa,
      idEnderecoServer: idEndereco,
      cnpjServer: cnpj,
      razaoSocialServer: razaoSocial,
      nomeFantasiaServer: nomeFantasia,
      cidadeServer: cidade,
      ufServer: uf,
      cepServer: cep,
      numeroServer: numero,
      bairroServer: bairro,
      logradouroServer: logradouro,
      complementoServer: complemento,
      statusServer: status
    } = req.body;

    // Buscar dados existentes
    const resultadoEmpresa = await empresaModel.buscarPorCnpj(cnpj);
    if (!resultadoEmpresa || resultadoEmpresa.length === 0) {
      console.log(resultadoEmpresa)
      return res.status(404).json({ message: "Empresa não encontrada" });
    }
    const IdEmpresa = resultadoEmpresa[0].idEmpresa;
    const fk_Endereco = resultadoEmpresa[0].fk_endereco;

    const resultadoEndereco = await enderecoModel.listarEndereco(fk_Endereco);
    if (!resultadoEndereco || resultadoEndereco.length === 0) {
      console.log(resultadoEndereco)
      return res.status(404).json({ message: "Endereço não encontrado" });
    }

    // Atualizar informações
    const resultadoEdicao = await empresaModel.editarEmpresa(
        IdEmpresa,
        razaoSocial || resultadoEmpresa[0].razaoSocial, // Usar valor existente caso vazio
        nomeFantasia || resultadoEmpresa[0].nomeFantasia,
        status || resultadoEmpresa[0].status,
    );

    const resultadoEdicao2 = await enderecoModel.editarEndereco(
        fk_Endereco,
        cidade || resultadoEndereco[0].cidade,
        cep || resultadoEndereco[0].cep,
        uf || resultadoEndereco[0].uf,
        numero || resultadoEndereco[0].numero,
        bairro || resultadoEndereco[0].bairro,
        logradouro || resultadoEndereco[0].logradouro,
        complemento || resultadoEndereco[0].complemento
    )

    // Consolidar resposta final
    res.status(200).json({
      message: "Atualização concluída com sucesso",
      empresa: {
        ...resultadoEmpresa[0],
        razaoSocial: razaoSocial || resultadoEmpresa[0].razaoSocial,
        nomeFantasia: nomeFantasia || resultadoEmpresa[0].nomeFantasia,
        status: status || resultadoEmpresa[0].status
      },
      endereco: {
        cidade: cidade || resultadoEndereco[0].cidade,
        cep: cep || resultadoEndereco[0].cep,
        logradouro: logradouro || resultadoEndereco[0].logradouro,
        bairro: bairro || resultadoEndereco[0].bairro,
        numero: numero || resultadoEndereco[0].numero,
        complemento: complemento || resultadoEndereco[0].complemento,
        uf: uf || resultadoEndereco[0].uf
      },
      resultadoEdicao,
      resultadoEdicao2
    });
  } catch (error) {
    console.error("Erro ao editar:", error);
    res.status(500).json({ message: "Erro ao processar a solicitação", error: error.sqlMessage });
  }
}


module.exports = {
  buscarPorCnpj,
  buscar,
  cadastrar,
  editar,
  listar,
};
