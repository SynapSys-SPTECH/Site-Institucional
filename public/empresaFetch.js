const janelaAtual = window.location.pathname;
console.log(janelaAtual)

function cadastrarEmpresa() {
  let idUserVar = sessionStorage.ID_USUARIO;
  let cnpjVar = document.getElementById("input_add_cnpj").value.replace(/[\.\-\/]/g, "");
  let nomeFantasiaVar = document.getElementById("input_add_nomeFantasia").value;
  let cidadeVar = document.getElementById("input_add_cidade").value;
  let ufVar = document.getElementById("input_add_uf").value;
  let cepVar = document.getElementById("input_add_cep").value.replace(/-/g, "");
  let numeroVar = Number(document.getElementById("input_add_numero").value);
  let bairroVar = document.getElementById("input_add_bairro").value;
  let razaoSocialVar = document.getElementById("input_add_razaoSocial").value;
  let ieVar = document.getElementById("input_add_ie").value.replace(/[\.\-]/g, "");
  let logradouroVar = document.getElementById("input_add_logradouro").value;
  let complementoVar = document.getElementById("input_add_complemento").value;

  console.log(idUserVar);



  if (
    cnpjVar == "" ||
    nomeFantasiaVar == "" ||
    cidadeVar == "" ||
    ufVar == "" ||
    cepVar == "" ||
    numeroVar == "" ||
    bairroVar == "" ||
    razaoSocialVar == "" ||
    ieVar == "" ||
    logradouroVar == "" ||
    complementoVar == ""
  ) {
    Swal.fire({
      icon: "error",
      title: "Opa...",
      text: 'Todos os campos devem ser preenchidos.',
      showConfirmButton: true,
      confirmButtonText: "Tentar novamente."
    })
    return;
  } else if (cnpjVar.length !== 14) {
    Swal.fire({
      icon: "error",
      title: "Opa...",
      text: 'O CNPJ está incorreto, deve seguir o padrão (00.000.000/0000-00).',
      showConfirmButton: true,
      confirmButtonText: "Tentar novamente."
    })
    return;
  } else if (ufVar.length !== 2) {
    Swal.fire({
      icon: "error",
      title: "Opa...",
      text: 'O UF está incorreto, deve seguir o padrão (SP, RJ, etc).',
      showConfirmButton: true,
      confirmButtonText: "Tentar novamente."
    })
    return;
  } else if (cepVar.length !== 8) {
    Swal.fire({
      icon: "error",
      title: "Opa...",
      text: 'O CEP está incorreto. Deve seguir o padrão (00000-000)',
      showConfirmButton: true,
      confirmButtonText: "Tentar novamente."
    })
    return;
  }

  Swal.fire({
    title: "Deseja cadastrar uma nova empresa?",
    text: "Você estará anexando uma empresa ao seu nome!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    cancelButtonText: "Cancelar",
    confirmButtonText: "Isso, criar!"
  }).then((result) => {
    if (result.isConfirmed) {
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
            Swal.fire({
              icon: "success",
              title: "Isso!",
              text: 'Empresa cadastrada com sucesso! ',
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

function buscarEmpresas() {
  let idUserVar = sessionStorage.ID_USUARIO;

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

        // Função para criar opções no select
        function criarOpcoesSelect(json, selectId) {
          const selectElement = document.getElementById(selectId);

          if (selectElement) {
            selectElement.innerHTML = "";

            const optionDefault = document.createElement("option");
            optionDefault.value = "#";
            optionDefault.textContent = "Selecione uma Empresa";
            selectElement.appendChild(optionDefault);

            // Adicionar opções para cada empresa na lista
            json.forEach((empresa) => {
              const option = document.createElement("option");
              option.value = empresa.idEmpresa; // Valor do ID da empresa
              option.textContent = empresa.nomeFantasia; // Nome da empresa
              selectElement.appendChild(option);
            });
          } else {
            console.error(`Elemento select com ID "${selectId}" não encontrado.`);
          }
        }

        // IDs dos selects onde as empresas devem aparecer
        const selectIds = ["select_empresa1", "select_empresa"];

        // Preencher ambos os selects
        selectIds.forEach((id) => {
          criarOpcoesSelect(json, id);
        });

        // Atualizar localStorage para cada empresa
        for (let i = 0; i < json.length; i++) {
          localStorage.setItem("nomeFantasia", json[i].nomeFantasia);
          localStorage.setItem("cidade", json[i].cidade);
          localStorage.setItem("cep", json[i].cep);
          localStorage.setItem("cnpj", json[i].cnpj);
          localStorage.setItem("status", json[i].idEmpresa);

          if (janelaAtual == "/Empresas/empresas.html") {
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
