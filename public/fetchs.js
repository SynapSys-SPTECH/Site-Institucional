var idUsuario = sessionStorage.getItem("ID_USUARIO")

function irDash() {
  window.location.href = "http://localhost:3333/Dashboard/dashboard.html";
}

function abrirLogon() {
  window.location = "./Login/login.html";
};

function verificarEmailExistente(emailVar) {
  return fetch("/usuarios/verificar-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email: emailVar })
  })
    .then((resposta) => {
      if (resposta.ok) {
        return resposta.json();
      } else {
        throw new Error("Erro ao verificar o e-mail.");
      }
    })
    .catch((erro) => {
      console.error("Erro ao verificar o e-mail:", erro);
      return null;
    });
}


function entrar() {
  var emailVar = emailLogin.value;
  let senhaVar = senhaLogin.value;

  if (emailVar == "" || senhaVar == "") {
    console.log("Preencha todos os campos para entrar!");
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

        irDash();

      });
      irDash();
    } else {
      document.getElementById("erro_login").innerHTML = "Email e(ou) senha inválido(os).";
      console.log("Houve um erro ao tentar realizar o login!");

      resposta.text().then(texto => {
        console.error(texto);
      });
    }

  }).catch(function (erro) {
    console.log(erro);
  })

  return false;
}

// ESCOPO GLOBAL

const caracterMaiusculo = "QWERTYUIOPASDFGHJKLZXCVBNM";
const caracterMinusculo = "qwertyuiopasdfghjklzxcvbnm";
const caracterNum = "1234567890";
const caracterEspecial = "!#$%&*?@_";

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
  let validar_email = emailVar.indexOf("@") >= 0 && emailVar.indexOf(".") >= 0;

  // VALIDAÇÃO COMPOSTA DA SENHA
  let tamanhoSenha = senhaVar.length >= 8;
  let qtdMaiusculo = 0;
  let qtdMinisculo = 0;
  let qtdNum = 0;
  let qtdCarecterEspecial = 0;
  let validarConfirmar = senhaVar === confirmacaoSenhaVar;

  // LAÇO QUE VAI PASSAR EM CADA CARACTER DA SENHA [contador] E,
  // CONFORME CADA VERIFICAÇÃO, CASO SEJA ECONTRADO UMA POSIÇÃO
  // VALIDA (=! -1), O PARAMETRO INCREMENTA MAIS UM.
  for (let contador = 0; contador <= senhaVar.length; contador++) {

    if (caracterMaiusculo.indexOf(senhaVar[contador]) != -1) {
      qtdMaiusculo++;
    }
    if (caracterMinusculo.indexOf(senhaVar[contador]) != -1) {
      qtdMinisculo++;
    }
    if (caracterNum.indexOf(senhaVar[contador]) != -1) {
      qtdNum++;
    }
    if (caracterEspecial.indexOf(senhaVar[contador]) != -1) {
      qtdCarecterEspecial++
    }
  }

  // VALIDA SE O EMAIL TEM @ E PONTO-FINAL
  if (validar_email == false) {
    console.log('Email preenchido incorretamente!')
  }

  // VALIDAÇÃO DE SENHA COMPOSTA:
  if (tamanhoSenha == false
    || qtdMaiusculo == 0
    || qtdMinisculo == 0
    || qtdNum == 0
    || qtdCarecterEspecial == 0) {

    console.log('Senha preenchida incorretamente!')
  }

  if (validarConfirmar == false) {
    console.log('Senhas não coincidem!');
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

