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
          localStorage.setItem("status", json[i].status)
          localStorage.setItem("tamanho", json[i].tamanho)
          localStorage.setItem("idPropriedade", json[i].idPropriedade)
          localStorage.setItem("statusPropriedade",json[i].statusPropriedade)
          adicionarNovaPropriedadeTabela();
        }
        console.log(JSON.stringify(json));
      });
    } else {
      return false;
    }
  });
}

function buscarStatusEmpresa(){
const idEmpresa = 1;

  fetch(`empresas/buscarStatus/${idEmpresa}`,{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (resposta) {
    if (resposta.ok) {
      window.alert("status da empresa " + resposta.json().resultadoEmpresa);
    } else if (resposta.status == 404) {
      window.alert("Deu 404!");
    } else {
      throw ("Houve um erro ao tentar realizar query status! Código da resposta: " + resposta.status);
    }
  })
}
// function editarPropriedade() {
//   let idUserVar = sessionStorage.ID_USUARIO;
//   let idPropriedadeVar = localStorage.idPropriedadeUpdate;
//   let cidadeVar = document.getElementById("input_edit_cidade").value.trim();
//   let logradouroVar = document.getElementById("input_edit_logradouro").value.trim();
//   let cepVar = document.getElementById("input_edit_cep").value.replace(/-/g, "").trim();
//   let tamanhoVar = document.getElementById("input_edit_tamanho").value.trim();
//   let ufVar = document.getElementById("input_edit_uf").value.trim();

//   const checkbox = document.getElementById("ckbox_status_propriedade");


//   const statusVar = checkbox.checked ? "Ativo" : "Inativo";


//   const algumCampoPreenchido =
//     cidadeVar !== "" ||
//     logradouroVar !== "" ||
//     cepVar !== "" ||
//     tamanhoVar !== "" ||
//     ufVar !== "";


//   if (!algumCampoPreenchido && statusVar === "Inativo" && localStorage.statusUpdate === "Ativo") {
//     Swal.fire({
//       icon: "error",
//       title: "Opa...",
//       text: "Você deve editar pelo menos um campo ou alterar o status antes de salvar.",
//       showConfirmButton: true,
//       confirmButtonText: "Entendido!",
//     });
//     return;
//   }
  


//   fetch(`/propriedades/editar`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       tamanhoServer: tamanhoVar,
//       cidadeServer: cidadeVar,
//       ufServer: ufVar,
//       cepServer: cepVar,
//       logradouroServer: logradouroVar,
//       idPropriedadeServer: idPropriedadeVar,
//       statusServer: statusVar,  
//     }),
//   })
//     .then(function (resposta) {
//       if (resposta.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Sucesso!",
//           text: "Propriedade editada com sucesso!",
//           showConfirmButton: true,
//           confirmButtonText: "Ufa!",
//         }).then(() => {
//           localStorage.setItem("statusPropriedade", statusVar); 
//           window.location.reload();
//         });
//       } else if (resposta.status === 404) {
//         Swal.fire({
//           icon: "error",
//           title: "Erro 404",
//           text: "Propriedade não encontrada. Verifique os dados e tente novamente.",
//           showConfirmButton: true,
//           confirmButtonText: "Tentar novamente",
//         });
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Ops!",
//           text: "Houve um erro ao editar a propriedade. Tente novamente.",
//           showConfirmButton: true,
//           confirmButtonText: "Tentar novamente",
//         });
//       }
//     })
//     .catch(function (resposta) {
//       console.error(`#ERRO: ${resposta}`);
//       Swal.fire({
//         icon: "error",
//         title: "Erro inesperado",
//         text: "Ocorreu um erro ao tentar editar a propriedade. Por favor, tente novamente mais tarde.",
//         showConfirmButton: true,
//         confirmButtonText: "Ok",
//       });
//     });
// }

// function editarPropriedade() {
//   let idUserVar = sessionStorage.ID_USUARIO;
//   let idPropriedadeVar = localStorage.idPropriedadeUpdate;
//   let cidadeVar = document.getElementById("input_edit_cidade").value.trim();
//   let logradouroVar = document.getElementById("input_edit_logradouro").value.trim();
//   let cepVar = document.getElementById("input_edit_cep").value.replace(/-/g, "").trim();
//   let tamanhoVar = document.getElementById("input_edit_tamanho").value.trim();
//   let ufVar = document.getElementById("input_edit_uf").value.trim();

//   const checkbox = document.getElementById("ckbox_status_propriedade");

//   // Status original da propriedade
//   const statusOriginal = localStorage.getItem("statusPropriedade") || "Ativo";  // "Ativo" é o padrão
//   const statusAtual = checkbox.checked ? "Ativo" : "Inativo";  // Status atual, de acordo com o checkbox

//   // Verificando se pelo menos um campo foi alterado
//   const algumCampoPreenchido =
//     cidadeVar !== "" ||
//     logradouroVar !== "" ||
//     cepVar !== "" ||
//     tamanhoVar !== "" ||
//     ufVar !== "";

//   // Se a propriedade está ativa, mas nenhum campo foi alterado, não permitir desmarcar o checkbox (deixar como "Inativo")
//   if (statusOriginal === "Ativo" && !algumCampoPreenchido && !checkbox.checked) {
//     Swal.fire({
//       icon: "error",
//       title: "Opa...",
//       text: "Você não pode deixar a propriedade inativa sem alterar algum campo.",
//       showConfirmButton: true,
//       confirmButtonText: "Entendido!",
//     });
//     return;
//   }

//   // Se a propriedade estava inativa, o checkbox foi marcado para ativo, mas nenhum campo foi alterado
//   if (statusOriginal === "Inativo" && statusAtual === "Ativo" && !algumCampoPreenchido) {
//     Swal.fire({
//       icon: "error",
//       title: "Opa...",
//       text: "Você precisa alterar pelo menos um campo para mudar o status para Ativo.",
//       showConfirmButton: true,
//       confirmButtonText: "Entendido!",
//     });
//     return;
//   }

//   // O status será alterado se algum campo for alterado ou se o checkbox foi alterado
//   const statusFinal = algumCampoPreenchido || statusAtual !== statusOriginal ? statusAtual : statusOriginal;

//   // Envio da requisição para editar a propriedade
//   fetch(`/propriedades/editar`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       tamanhoServer: tamanhoVar,
//       cidadeServer: cidadeVar,
//       ufServer: ufVar,
//       cepServer: cepVar,
//       logradouroServer: logradouroVar,
//       idPropriedadeServer: idPropriedadeVar,
//       statusServer: statusFinal,  // Status final que será enviado ao servidor
//     }),
//   })
//     .then(function (resposta) {
//       if (resposta.ok) {
//         Swal.fire({
//           icon: "success",
//           title: "Sucesso!",
//           text: "Propriedade editada com sucesso!",
//           showConfirmButton: true,
//           confirmButtonText: "Ufa!",
//         }).then(() => {
//           localStorage.setItem("statusPropriedade", statusFinal); // Atualiza o status no localStorage
//           window.location.reload();
//         });
//       } else if (resposta.status === 404) {
//         Swal.fire({
//           icon: "error",
//           title: "Erro 404",
//           text: "Propriedade não encontrada. Verifique os dados e tente novamente.",
//           showConfirmButton: true,
//           confirmButtonText: "Tentar novamente",
//         });
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Ops!",
//           text: "Houve um erro ao editar a propriedade. Tente novamente.",
//           showConfirmButton: true,
//           confirmButtonText: "Tentar novamente",
//         });
//       }
//     })
//     .catch(function (resposta) {
//       console.error(`#ERRO: ${resposta}`);
//       Swal.fire({
//         icon: "error",
//         title: "Erro inesperado",
//         text: "Ocorreu um erro ao tentar editar a propriedade. Por favor, tente novamente mais tarde.",
//         showConfirmButton: true,
//         confirmButtonText: "Ok",
//       });
//     });
// }
function editarPropriedade() {
  let idUserVar = sessionStorage.ID_USUARIO;
  let idPropriedadeVar = localStorage.idPropriedadeUpdate;
  let cidadeVar = document.getElementById("input_edit_cidade").value.trim();
  let logradouroVar = document.getElementById("input_edit_logradouro").value.trim();
  let cepVar = document.getElementById("input_edit_cep").value.replace(/-/g, "").trim();
  let tamanhoVar = document.getElementById("input_edit_tamanho").value.trim();
  let ufVar = document.getElementById("input_edit_uf").value.trim();

  const checkbox = document.getElementById("ckbox_status_propriedade");


  const statusOriginal = localStorage.getItem("statusPropriedade") || "Ativo";  
  const statusAtual = checkbox.checked ? "Ativo" : "Inativo"; 


  const algumCampoPreenchido =
    cidadeVar !== "" ||
    logradouroVar !== "" ||
    cepVar !== "" ||
    tamanhoVar !== "" ||
    ufVar !== "";


  if (statusOriginal === "Ativo" && !checkbox.checked && !algumCampoPreenchido) {
    Swal.fire({
      icon: "success",
      title: "Propriedade agora está Inativa!",
      text: "Você deixou a propriedade inativa com sucesso.",
      showConfirmButton: true,
      confirmButtonText: "Ok",
    });
  }


  if (statusOriginal === "Inativo" && statusAtual === "Ativo" && !algumCampoPreenchido) {
    Swal.fire({
      icon: "error",
      title: "Opa...",
      text: "Você precisa alterar pelo menos um campo para mudar o status para Ativo.",
      showConfirmButton: true,
      confirmButtonText: "Entendido!",
    });
    return;
  }


  const statusFinal = algumCampoPreenchido || statusAtual !== statusOriginal ? statusAtual : statusOriginal;

  fetch(`/propriedades/editar`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      tamanhoServer: tamanhoVar,
      cidadeServer: cidadeVar,
      ufServer: ufVar,
      cepServer: cepVar,
      logradouroServer: logradouroVar,
      idPropriedadeServer: idPropriedadeVar,
      statusServer: statusFinal,  
    }),
  })
    .then(function (resposta) {
      if (resposta.ok) {
        Swal.fire({
          icon: "success",
          title: "Sucesso!",
          text: "Propriedade editada com sucesso!",
          showConfirmButton: true,
          confirmButtonText: "Ufa!",
        }).then(() => {
          localStorage.setItem("statusPropriedade", statusFinal); 
          window.location.reload();
        });
      } else if (resposta.status === 404) {
        Swal.fire({
          icon: "error",
          title: "Erro 404",
          text: "Propriedade não encontrada. Verifique os dados e tente novamente.",
          showConfirmButton: true,
          confirmButtonText: "Tentar novamente",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Ops!",
          text: "Houve um erro ao editar a propriedade. Tente novamente.",
          showConfirmButton: true,
          confirmButtonText: "Tentar novamente",
        });
      }
    })
    .catch(function (resposta) {
      console.error(`#ERRO: ${resposta}`);
      Swal.fire({
        icon: "error",
        title: "Erro inesperado",
        text: "Ocorreu um erro ao tentar editar a propriedade. Por favor, tente novamente mais tarde.",
        showConfirmButton: true,
        confirmButtonText: "Ok",
      });
    });
}

export { cadastrar, buscarPropriedade, editarPropriedade, buscarStatusEmpresa };
