var idUsuario = sessionStorage.getItem("ID_USUARIO")

function irDash() {
  window.location.href = "../Dashboard/dashboard.html";
}

function abrirLogon() {
  window.location = "../Login/login.html";
};

function validarSenha(senha) {
  const minLength = 8;
  const regexMaiuscula = /[A-Z]/;
  const regexMinuscula = /[a-z]/;
  const regexNumero = /\d/;
  const regexEspecial = /[!#$%&*?@_]/;

  if (senha.length < minLength) {
    Swal.fire({
      icon: 'error',
      title: 'Senha inválida',
      text: 'A senha deve conter pelo menos 8 caracteres',
      confirmButtonText: 'Tentar novamente'
    });
    return false;
  }
  if (!regexMaiuscula.test(senha)) {
    Swal.fire({
      icon: 'error',
      title: 'Senha Inválida',
      text: 'A senha deve conter pelo menos uma letra maiúscula.',
      confirmButtonText: 'Tentar novamente'
    });
    return false;
  }
  if (!regexMinuscula.test(senha)) {
    Swal.fire({
      icon: 'error',
      title: 'Senha inválida',
      text: 'A senha deve conter pelo menos uma letra minúscula.',
      confirmButtonText: 'Tentar novamente'
    });
    return false;
  }
  if (!regexNumero.test(senha)) {
    Swal.fire({
      icon: 'error',
      title: 'Senha inválida',
      text: 'A senha deve conter pelo menos um número.',
      confirmButtonText: 'Tentar novamente'
    });
    return false;
  }
  if (!regexEspecial.test(senha)) {
    Swal.fire({
      icon: 'error',
      title: 'Senha inválida',
      text: 'A senha deve conter pelo menos um caractér especial (!#$%&*?@_).',
      confirmButtonText: 'Tentar novamente'
    });
    return false;
  }

  return true;
}


function entrar() {
  var emailVar = emailLogin.value;
  var senhaVar = senhaLogin.value;

  if (emailVar == "" || senhaVar == "") {
    Swal.fire({
      icon: 'error',
      title: 'Campos obrigatórios',
      text: 'Por favor, preencha todos os campos.',
    });
    return false;
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
    if (resposta.ok) {
      resposta.json().then(json => {
        sessionStorage.setItem("ID_USUARIO", json.idUsuario);
        sessionStorage.setItem("EMAIL_USUARIO", json.email);
        sessionStorage.setItem("TIPO_USUARIO", json.fktipo);
        sessionStorage.setItem("NOME_USUARIO", json.nome);
        window.location.href = "http://localhost:3333/Dashboard/dashboard.html";
      });
    } else {
      resposta.text().then(texto => {

        if (texto === "Email não encontrado.") {
          Swal.fire({
            icon: 'error',
            title: 'Email não encontrado',
            text: 'O email fornecido não está cadastrado.',
          });
        } else if (texto === "Senha incorreta.") {
          Swal.fire({
            icon: 'error',
            title: 'Senha incorreta',
            text: 'A senha informada não corresponde ao email.',
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Erro de autenticação',
            text: 'Houve um erro ao tentar fazer o login. Tente novamente.',
          });
        }
      });
    }
  }).catch(function (erro) {
    console.log(erro);
    Swal.fire({
      icon: 'error',
      title: 'Erro no login',
      text: 'Houve um problema ao tentar fazer o login. Tente novamente.',
    });
  });

  return false;
}

function cadastrar() {
  let nomeVar = nomeCadastro.value;
  let telefoneVar = telefoneCadastro.value.replace(/[()\-\s]/g, "");
  let emailVar = emailCadastro.value;
  let senhaVar = senhaCadastro.value;
  let confirmacaoSenhaVar = confirmacaoCadastro.value;
  let tipoVar = 1;
  if (
    emailVar == "" ||
    senhaVar == "" ||
    confirmacaoSenhaVar == "" ||
    tipoVar == "" ||
    telefoneVar == "" ||
    nomeVar == ""
  ) {
    Swal.fire({
      icon: "warning",
      title: "Campos obrigatórios!",
      text: "Por favor, preencha todos os campos antes de continuar.",
      confirmButtonText: 'Tentar novamente'
    });
    return;
  }

  let validar_email = emailVar.indexOf("@") >= 0 && emailVar.indexOf(".") >= 0;

  if (!validar_email) {
    Swal.fire({
      icon: 'error',
      title: 'Email inválido',
      text: 'Por favor, informe um email válido!',
      confirmButtonText: 'Tentar novamente'
    });
    return;
  }


  if (!validarSenha(senhaVar)) {
    return;
  }

  if (senhaVar !== confirmacaoSenhaVar) {
    Swal.fire({
      icon: "warning",
      title: "As senhas não coincidem",
      text: "Por favor, verifique sua senha antes de continuar",
      confirmButtonText: 'Tentar novamente'
    });
    return;
  }




  verificarEmailExistente(emailVar).then((emailDisponivel) => {
    if (emailDisponivel) {
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
          if (resposta.ok) {
            Swal.fire({
              icon: "success",
              title: "Cadastro realizado com sucesso!",
              text: "Redirecionando para a tela de login...",
            });
            setTimeout(() => {
              abrirLogon();
            }, 2000);
          } else {
            throw "Erro ao realizar o cadastro.";
          }
        })
        .catch(function (erro) {
          console.error(erro);
          Swal.fire({
            icon: "error",
            title: "Erro no cadastro",
            text: "Não foi possível realizar o cadastro. Tente novamente mais tarde.",
          });
        });
    } else {
      console.log("Cadastro interrompido. E-mail já existe.");
    }
  });
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

  if (nomeVar == "") {
    nomeVar = sessionStorage.NOME_USUARIO
  } else {
    sessionStorage.setItem("NOME_USUARIO", nomeVar);
  }

  if (emailVar == "") {
    emailVar = sessionStorage.EMAIL_USUARIO
  } else {
    sessionStorage.setItem("EMAIL_USUARIO", emailVar);
  }

  if (!emailVar.includes("@")) {
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
        console.log(
          "Edição realizado com sucesso!")
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

  if (senhaNovaVar != confirmarSenhaVar) {
    alert("Confirmar senha não bate com o campo senha")
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
      alert("Senha Atual errada!")
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
        console.log(
          "Edição realizado com sucesso!")
      } else {
        throw "Houve um erro ao tentar realizar a edição!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  return false;
}

function verificarEmailExistente(emailVar) {
  return fetch("/usuarios/verificar-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ emailServer: emailVar })
  })
    .then((resposta) => {
      if (resposta.ok) {
        return true;
      } else if (resposta.status == 409) {
        Swal.fire({
          icon: "error",
          title: "E-mail já cadastrado!",
          text: "Por favor, use outro e-mail para o cadastro.",
        });
        return false;
      } else {
        throw new Error("Erro ao verificar o e-mail.");
      }
    })
    .catch((erro) => {
      console.error("Erro ao verificar o e-mail:", erro);
      Swal.fire({
        icon: "error",
        title: "Erro no sistema",
        text: "Não foi possível verificar o e-mail. Tente novamente mais tarde.",
      });
      return false;
    });
}

