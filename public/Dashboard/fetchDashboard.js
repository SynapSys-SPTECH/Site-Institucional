import { Perimetro } from "./Perimetro.js";

async function buscarEmpresaPorCidade(idEmpresaSelect) {
  let idEmpresa = idEmpresaSelect;

  fetch(`/empresas/buscarIdEmpresa/${idEmpresa}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then((json) => {
        const cidadeEmpresa = json[0].cidade;
        buscarLongitudeLatitude(cidadeEmpresa);
      });
    } else {
      return false;
    }
  });
}

async function buscarLongitudeLatitude(cidadeEmpresa) {
  const cidadeCodificada = encodeURIComponent(cidadeEmpresa);
  fetch(`/dashboard/buscarLongitudeLatitude/${cidadeCodificada}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then((json) => {
        console.log(JSON.stringify(json));
        sessionStorage.setItem("latitudeEmpresa", json[0].latitude.toFixed(2));
        sessionStorage.setItem(
          "longitudeEmpresa",
          json[0].longitude.toFixed(2)
        );
        atualizarMapa();
      });
    } else {
      return false;
    }
  });
}

function atualizarMapa() {
  // Obtém a nova latitude e longitude
  latitude = parseFloat(sessionStorage.getItem("latitudeEmpresa"));
  longitude = parseFloat(sessionStorage.getItem("longitudeEmpresa"));

  // Se a latitude e longitude forem válidas, atualiza o marcador
  if (!isNaN(latitude) && !isNaN(longitude)) {
    marker.setLatLng([latitude, longitude]); // Atualiza a posição do marcador
  } else {
    marker.setLatLng([0, 0]);
  }
}

function buscarPontosComPotencialDeExpansao() {
  const velocidadeMedia = 4;
  const tempoParaBuscaEmMeses = 12;

  fetch(
    `/dashboard/buscarPontosComPotencialDeExpansao/${velocidadeMedia}/${tempoParaBuscaEmMeses}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then(function (resposta) {
    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then((json) => {
        montarPerimetroPontosDeExpansao(json);
        mesesComMaisDiasFavoraveis();
      });
    } else {
      return false;
    }
  });
}

async function montarPerimetroPontosDeExpansao(json) {
  const pontosDeExpansao = json.map(
    (data) => new Perimetro(data.latitude, data.longitude)
  );

  const mapa = window.myMap;

  pontosDeExpansao.forEach((perimetro) => {
    perimetro.aparecerCirculoNoMapa(mapa);
  });
  quantidadePontosDeExpansao(pontosDeExpansao);
}

async function quantidadePontosDeExpansao(pontosDeExpansao) {
  const qtdPontosExpansao = pontosDeExpansao.length;
  document.getElementById("qtdPontosPotencialExpansao").innerHTML =
    qtdPontosExpansao;
}

function mesesComMaisDiasFavoraveis() {
  fetch(`/dashboard/buscarMesesComMaisDiasFavoraveis`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (resposta) {
    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then((json) => {
        let dados = [];
        console.log("MESES COM MAIS DIAS ->", json);
        for (var i = 0; i < json.length; i++) {
          dados.push(`${json[i].municipio}: ${json[i].ano_mes}`);
          dados.push(json[i].total);
        }
        drawChart(dados);
      });
    } else {
      return false;
    }
  });
}

function diasComVentosAcimaDoLimite() {
  fetch(`/dashboard/diasComVentosAcimaDoLimite`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (resposta) {
    if (resposta.ok) {
      console.log(resposta);
      resposta.json().then((json) => {
        const qtdDiasComVentoAcima = json.length;
        document.getElementById("diasVentosAcimaDoLimite").innerHTML =
          qtdDiasComVentoAcima;
      });
    } else {
      return false;
    }
  });
}

export {
  buscarLongitudeLatitude,
  buscarEmpresaPorCidade,
  buscarPontosComPotencialDeExpansao,
  atualizarMapa,
  quantidadePontosDeExpansao,
  diasComVentosAcimaDoLimite,
};
