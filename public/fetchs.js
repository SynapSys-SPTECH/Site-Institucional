
function irDash() {
  window.location = "./dashboard/dashboard.html#dashboard";
}// apenas para exibir o loading


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

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

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
        console.log("ESTOU NO THEN DO entrar()! RESPOSTA ABAIXO")
      console.log(resposta)
        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
              console.log("Dentro do resposta.json")
                console.log(json);
                console.log(JSON.stringify(json));
                json.forEach(element => {
                  console.log(element.nome)                
                
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.TIPO_USUARIO = json.tipo
                // sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.id;
                // sessionStorage.AQUARIOS = JSON.stringify(json.aquarios)

              });
                irDash();

            });
            irDash();
        } else {

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

function cadastrar() {
    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    let emailVar = emailCadastro.value
    let senhaVar = senhaCadastro.value
    let confirmacaoSenhaVar = confirmacaoCadastro.value
    let tipoVar = tipoUserCadastro.value
    // var idEmpresaVincular

    // Verificando se há algum campo em branco
    if (
      emailVar == "" ||
      senhaVar == "" ||
      confirmacaoSenhaVar == "" ||
      tipoVar == ""
    ) {
      console.log("Mensagem de erro para todos os campos em branco")
    } else {
      console.log("Campos Preenchidos.")
    }
        // finalizarAguardar();

    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
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
            window.location = "./index.html";
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

   // Listando empresas cadastradas 
   


function deletarUser(){

}

function atualizarUser(){

}

