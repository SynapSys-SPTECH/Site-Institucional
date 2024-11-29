var idUsuario = sessionStorage.getItem("ID_USUARIO")

function irDash() {
  window.location.href = "../Dashboard/dashboard.html";
}

function abrirLogon() {
  window.location = "../Login/login.html";
};


function entrar() {
  var emailVar = emailLogin.value;
  let senhaVar = senhaLogin.value;

  if (emailVar == "" || senhaVar == "") {
    console.log("Mensagem de erro para todos os campos em branco");
    return false;
  }
  else {
    console.log("Sumir Mensagem?")
  }

  fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      emailServer: emailVar,
      senhaServer: senhaVar
    })
  }).then(function (resposta) {
    console.log(resposta)
    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then(json => {
        console.log(json);
        console.log(JSON.stringify(json));

        sessionStorage.ID_USUARIO = json.idUsuario;
        sessionStorage.EMAIL_USUARIO = json.email;
        sessionStorage.TIPO_USUARIO = json.fktipo
        sessionStorage.NOME_USUARIO = json.nome;

        Swal.fire({
          icon: "success",
          title: "Isso!",
          text: 'Login realizado com sucesso! ',
          showConfirmButton: true,
          confirmButtonText: "Entrar!"

        }).then((result) => {
          if (result.isConfirmed) {
            irDash()
          } else {
            irDash()
          }
        });
      });
    } else {
      Swal.fire({
            icon: "error",
            title: "Opa...",
            text: 'Email e(ou) Senha Incorretos! ',
            showConfirmButton: true,
            confirmButtonText: "Tentar Novamente!"
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            } else {
              window.location.reload();
            }
          });

      resposta.text().then(texto => {
        console.error(texto);
      });
    }

  }).catch(function (erro) {
    console.log(erro);
  })

  return false;
}

function cadastrar() {

  let nomeVar = nomeCadastro.value
  let telefoneVar = telefoneCadastro.value
  let emailVar = emailCadastro.value
  let senhaVar = senhaCadastro.value
  let confirmacaoSenhaVar = confirmacaoCadastro.value
  let tipoVar = tipoUserCadastro.value

  if (
    emailVar == "" ||
    senhaVar == "" ||
    confirmacaoSenhaVar == "" ||
    tipoVar == "" ||
    telefoneVar == "" ||
    nomeVar == ""
  ) {
    console.log("Mensagem de erro para todos os campos em branco")
  } else {
    console.log("Campos Preenchidos.")
  }

  fetch("../usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({

      nomeServer: nomeVar,
      telefoneServer: telefoneVar,
      emailServer: emailVar,
      senhaServer: senhaVar,
      tipoServer: tipoVar
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {

        console.log(
          "Cadastro realizado com sucesso! Redirecionando para tela de Login...");

        setTimeout(() => {
          abrirLogon();
        }, "2000");

      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  return false;
}

function deletar(idUsuario) {
  console.log("Criar função de apagar post escolhido - ID" + idUsuario);
  fetch(`/usuarios/deletar/${idUsuario}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(function (resposta) {

    if (resposta.ok) {
      window.alert("Conta Deletada Com sucesso!");
      window.location = "../index.html"
    } else if (resposta.status == 404) {
      window.alert("Deu 404!");
    } else {
      throw ("Houve um erro ao tentar realizar a exclusão da conta: " + resposta.status);
    }
  }).catch(function (resposta) {
    console.log(`#ERRO: ${resposta}`);
  });
}


function atualizarInfo() {
    let nomeVar = nomeConta.value;
    let emailVar = emailConta.value
    let idUsuarioVar = sessionStorage.ID_USUARIO

    if(nomeVar == "") {
      nomeVar = sessionStorage.NOME_USUARIO
    } else {
      sessionStorage.setItem("NOME_USUARIO", nomeVar); 
    }

    if(emailVar == "") {
      emailVar = sessionStorage.EMAIL_USUARIO
    } else {
      sessionStorage.setItem("EMAIL_USUARIO", emailVar); 
    }

    if(!emailVar.includes("@")){
        alert("Email Invalido!")
        return;
    }

    console.log("idUsuarioVar:", idUsuarioVar);

    fetch(`../usuarios/editar/${idUsuarioVar}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nomeServer: nomeVar,
        emailServer: emailVar,
        idServer: idUsuarioVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);
        if (resposta.ok) {
          Swal.fire({
            icon: "success",
            title: "Isso!",
            text: 'Informações atualizadas com sucesso! ',
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
          throw "Houve um erro ao tentar realizar a edição!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
  
    return false;
  }

  function atualizarSenha() {
    let senhaNovaVar = novaSenhaConta.value;
    let confirmarSenhaVar = confirmarSenhaConta.value
    let senhaAtualVar = senhaAtualConta.value;
    let emailVar = sessionStorage.EMAIL_USUARIO;
    let idUsuarioVar = sessionStorage.ID_USUARIO

    if(senhaNovaVar != confirmarSenhaVar) {
      Swal.fire({
        icon: "error",
        title: "Opa...",
        text: 'As Senhas não coincidem...',
        showConfirmButton: true,
        confirmButtonText: "Tentar novamente."
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else {
          window.location.reload();
        }
      });
      return;
    }

    fetch("/usuarios/autenticar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      emailServer: emailVar,
      senhaServer: senhaAtualVar
    })
  }).then(function (resposta) {
    if (resposta.ok) {
      console.log(resposta);
    } else {
      console.log("Senha Atual errada!");
      Swal.fire({
        icon: "error",
        title: "Opa...",
        text: 'Senha atual incorreta.',
        showConfirmButton: true,
        confirmButtonText: "Tentar novamente."
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        } else {
          window.location.reload();
        }
      });
      return;
    }

  }).catch(function (erro) {
    console.log(erro);
  })


    fetch(`../usuarios/editarSenha/${idUsuarioVar}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        senhaServer: senhaNovaVar,
        idServer: idUsuarioVar
      }),
    })
      .then(function (resposta) {
        console.log("resposta: ", resposta);
        if (resposta.ok) {
          Swal.fire({
            icon: "success",
            title: "Isso!",
            text: 'Senha atualizada com sucesso! ',
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
          throw "Houve um erro ao tentar realizar a edição!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });
  
    return false;
  }

