const janelaAtual =window.location.pathname;

function cadastrarEmpresa() {
  let idUserVar = sessionStorage.ID_USUARIO;
  let cnpjVar = document.getElementById("cnpj").value;
  let nomeFantasiaVar = document.getElementById("nomeFantasia").value;
  let cidadeVar = document.getElementById("cidade").value;
  let ufVar = document.getElementById("uf").value;
  let cepVar = document.getElementById("cep").value;
  let numeroVar = Number(document.getElementById("numero").value);
  let bairroVar = document.getElementById("bairro").value;
  let razaoSocialVar = document.getElementById("razaoSocial").value;
  let ieVar = document.getElementById("ie").value;
  let logradouroVar = document.getElementById("logradouro").value;
  let complementoVar = document.getElementById("complemento").value;

  console.log(idUserVar);

  // if (cnpjVar.length !== 14) {
  //   alert("CNPJ INVALIDO!")
  //   return;
  // }

  // if (ufVar.length !== 2) {
  //   alert("UF INVALIDO!")
  //   return;
  // }

  // if (cepVar.length !== 8) {
  //   alert("CEP INVALIDO")
  //   return;
  // }

  fetch("../empresas/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cnpjServer: cnpjVar,
      nomeFantasiaServer: nomeFantasiaVar,
      cidadeServer: cidadeVar,
      ufServer: ufVar,
      cepServer: cepVar,
      numeroServer: numeroVar,
      bairroServer: bairroVar,
      razaoSocialServer: razaoSocialVar,
      ieServer: ieVar,
      logradouroServer: logradouroVar,
      complementoServer: complementoVar,
      idServer: idUserVar,
    }),
    credentials: "include",
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        console.log("Cadastro de empresa realizado com sucesso!");
        alert("Empresa cadastrada com sucesso!");
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

function buscarEmpresas() {
  let idUserVar = sessionStorage.ID_USUARIO;
  let nomeFantasia;

  fetch(`/empresas/buscar/${idUserVar}`, {
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
        localStorage.setItem("qtdEmpresas", json.length);
        console.log("qtd empresa ->", localStorage.qtdEmpresas);

        // Função que cria as opções dinamicamente no select
        function criarOpcoesSelect(json) {
          const selectElement = document.getElementById("select_empresa");

          selectElement.innerHTML = "";

          const optionDefault = document.createElement("option");
          optionDefault.value = "#";
          optionDefault.textContent = "Selecione uma Empresa";
          selectElement.appendChild(optionDefault);

          // Adicionar opções para cada empresa na lista
          json.forEach((json) => {
            const option = document.createElement("option");
            option.value = json.idEmpresa; // Valor do ID da empresa
            option.textContent = json.nomeFantasia; // Nome da empresa
            selectElement.appendChild(option);
          });

        }
        if(janelaAtual != "../Propriedades/propriedades.html"){
          criarOpcoesSelect(json);
        }
        


        for (let i = 0; i < json.length; i++) {
          localStorage.setItem("nomeFantasia", json[i].nomeFantasia);
          localStorage.setItem("cidade", json[i].cidade);
          localStorage.setItem("cep", json[i].cep);
          localStorage.setItem("cnpj", json[i].cnpj);
          localStorage.setItem("status", json[i].idEmpresa);
          if (
            janelaAtual ==
            "/Empresas/empresas.html"
          ) {
            adicionarNovaEmpresaTabela();
          }
        }
        console.log(JSON.stringify(json));
      });
    } else {
      return false;
    }
  });
}

export { cadastrarEmpresa, buscarEmpresas };
