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
      // crie um atributo que recebe o valor recuperado aqui
      // Agora vá para o arquivo routes/usuario.js
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
