export function cadastrarEmpresa() {
  let cnpjVar = cnpj.value;
  let nomeFantasiaVar = nomeFantasia.value;
  let cidadeVar = cidade.value;
  let ufVar = uf.value;
  let cepVar = cep.value;
  let numeroVar = Number(numero.value);
  let bairroVar = bairro.value;
  let razaoSocialVar = razaoSocial.value;
  let ieVar = ie.value;
  let logradouroVar = logradouro.value;
  let complementoVar = complemento.value;

  fetch("/empresas/cadastrar", {
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
    }),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        console.log(
          "Cadastro de empresa realizado com sucesso!"
        );
        
      } else {
        throw "Houve um erro ao tentar realizar o cadastro!";
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

  return false;
}

export function buscarEmpresas(){
  
  fetch("/empresas/listar", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro na requisição: ' + response.status);
    }
    return response.json()
  })
  .then(empresas => {
    console.log(empresas);  
  })
  .catch(error => {
    console.error('Erro:', error);
  });
}
