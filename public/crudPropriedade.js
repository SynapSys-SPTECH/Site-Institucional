import { buscarEmpresas } from '../empresaFetch.js';

await buscarEmpresas();
const quantidadeEmpresas = localStorage.qtdEmpresas;

function cadastrar() {
  var logradouro = document.getElementById("input_logradouro").value;
  var tamanho = document.getElementById("input_tamanho").value;
  var cep = document.getElementById("input_cep").value;
  var cidade = document.getElementById("input_cidade").value;
  var uf = document.getElementById("input_uf").value;
  var empresa = document.getElementById("select_empresa").value;
  let idUserVar = sessionStorage.ID_USUARIO;
  console.log("tamanho ->",tamanho)
  if (
    logradouro == "" ||
    cep == "" ||
    tamanho == "" ||
    cidade == "" ||
    uf == ""
  ) {
    alert("Todos os campos devem ser preenchidos");
  } else {
    if (cep.length != 8) {
      alert("Erro no CEP");
      return;
    }

    if (uf.length != 2) {
      alert("Erro no UF");
      return;
    }
  }

  // Enviando o valor da nova input
  fetch("/propriedades/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      logradouroServer: logradouro,
      cepServer: cep,
      tamanhoServer: tamanho,
      cidadeServer: cidade,
      ufServer: uf,
      empresaServer: empresa,
      idServer: idUserVar
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        console.log(
          "Cadastro de propriedade realizado com sucesso!"
        );
        alert("Propriedade cadastrada com sucesso!")
        window.location.reload();

      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
  return false;
}

function buscarPropriedade() {
  let idUserVar = sessionStorage.ID_USUARIO;

  fetch(`/propriedades/buscar/${idUserVar}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (resposta) {
    if (resposta.ok) {
      console.log(resposta);
      console.log("FOI BUSCAR");
      resposta.json().then((json) => {
        console.log(json);
        for(let i = 0; i < json.length; i++){
          localStorage.setItem("nomeFantasia", json[i].nomeFantasia)
          localStorage.setItem("cidade", json[i].cidade)
          localStorage.setItem("cep", json[i].cep)
          localStorage.setItem("logradouro", json[i].logradouro)
          localStorage.setItem("cnpj", json[i].cnpj)  
          localStorage.setItem("status",json[i].idEmpresa)
          localStorage.setItem("tamanho", json[i].tamanho)
          adicionarNovaPropriedadeTabela();
        }
        console.log(JSON.stringify(json));
      });
    } else {
      return false;
    }
  });
}

export { cadastrar, buscarPropriedade };
