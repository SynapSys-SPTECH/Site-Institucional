import { buscarEmpresas } from '../empresaFetch.js';

await buscarEmpresas();
const quantidadeEmpresas = localStorage.qtdEmpresas;

function cadastrar() {
  var logradouro = document.getElementById("input_add_logradouro").value;
  var tamanho = document.getElementById("input_add_tamanho").value;
  var cep = document.getElementById("input_add_cep").value.replace("-", "");
  var cidade = document.getElementById("input_add_cidade").value;
  var uf = document.getElementById("input_add_uf").value;
  var empresa = document.getElementById("select_empresa").value;
  let idUserVar = sessionStorage.ID_USUARIO;



  console.log("tamanho ->", tamanho)
  if (
    logradouro == "" ||
    cep == "" ||
    tamanho == "" ||
    cidade == "" ||
    uf == ""
  ) {
    Swal.fire({
      icon: "error",
      title: "Opa...",
      text: 'Todos os campos devem ser preenchidos.',
      showConfirmButton: true,
      confirmButtonText: "Tentar novamente."
    })
    return;
  } else {
    if (cep.length != 8) {
      Swal.fire({
        icon: "error",
        title: "Opa...",
        text: 'O CEP está incorreto. Deve seguir o padrão (00000-000)',
        showConfirmButton: true,
        confirmButtonText: "Tentar novamente."
      })
      return;
    }

    if (uf.length != 2) {
      Swal.fire({
        icon: "error",
        title: "Opa...",
        text: 'O UF está incorreto, deve seguir o padrão (SP, RJ, etc).',
        showConfirmButton: true,
        confirmButtonText: "Tentar novamente."
      })
      return;
    }

    if (empresa == null || empresa == "#") {
      Swal.fire({
        icon: "error",
        title: "Opa...",
        text: 'Você deve escolher uma empresa para continuar.',
        showConfirmButton: true,
        confirmButtonText: "Tentar novamente."
      })
      return;
    }
  }

  Swal.fire({
    title: "Deseja cadastrar uma nova propriedade?",
    text: "Você estará anexando uma propriedade à esta empresa!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Isso, criar!"
  }).then((result) => {
    if (result.isConfirmed) {
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
            Swal.fire({
              icon: "success",
              title: "Isso!",
              text: 'Propriedade cadastrada com sucesso! ',
              showConfirmButton: true,
              confirmButtonText: "Ufa!"
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              } else {
                window.location.reload();
              }
            });

          } else {
            throw "Houve um erro ao tentar realizar o cadastro!";
          }
        })
        .catch(function (resposta) {
          console.log(`#ERRO: ${resposta}`);
        });

    }
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
        for (let i = 0; i < json.length; i++) {
          localStorage.setItem("nomeFantasia", json[i].nomeFantasia)
          localStorage.setItem("cidade", json[i].cidade)
          localStorage.setItem("cep", json[i].cep)
          localStorage.setItem("logradouro", json[i].logradouro)
          localStorage.setItem("cnpj", json[i].cnpj)
          localStorage.setItem("status", json[i].idEmpresa)
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
