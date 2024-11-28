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
      console.log("Buscar Empresa Por Cidade ->",resposta);
      console.log("FOI BUSCAR EMPRESA ID");
      resposta.json().then((json) => {
        console.log("RESPOSTA ID EMPRESA -> ", json);
        console.log(JSON.stringify(json));
        console.log("Cidade:", json[0].cidade);
        const cidadeEmpresa = json[0].cidade;
        buscarLongitudeLatitude(cidadeEmpresa)
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
      console.log(resposta);
      console.log("FOI BUSCAR LONGITUDE LATITUDE");
      resposta.json().then((json) => {
        console.log("RESPOSTA LONG LAT -> ", json);
        console.log(JSON.stringify(json));
        sessionStorage.setItem("latitudeEmpresa", json[0].latitude.toFixed(2))
        sessionStorage.setItem("longitudeEmpresa", json[0].longitude.toFixed(2))
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
      marker.setLatLng([latitude, longitude]);  // Atualiza a posição do marcador
      map.setView([latitude, longitude], map.getZoom());  // Centraliza o mapa na nova posição
  }
}

function buscarPontosComPotencialDeExpansao() {
  const velocidadeMedia = 4;
  const tempoParaBuscaEmMeses = 8;
  
  fetch(`/dashboard/buscarPontosComPotencialDeExpansao/${velocidadeMedia}/${tempoParaBuscaEmMeses}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (resposta) {
    if (resposta.ok) {
      console.log(resposta);
      console.log("FOI BUSCAR PONTOS EXPANSAO");
      resposta.json().then((json) => {
        console.log("RESPOSTA PONTOS EXPANSAO -> ", json);
        montarPerimetroPontosDeExpansao(json)
      });
    } else {
      return false;
    }
  });
}

async function montarPerimetroPontosDeExpansao(json){
    const PontosDeExpansao = json.map(
      (data) => new Perimetro(data.latitude, data.longitude)
    );
    
    const mapa = window.myMap;

    console.log("Pontos de Expansao json.map ->", PontosDeExpansao)

    PontosDeExpansao.forEach(perimetro => {
        perimetro.aparecerCirculoNoMapa(mapa);
    });
}

export { buscarLongitudeLatitude, buscarEmpresaPorCidade, buscarPontosComPotencialDeExpansao, atualizarMapa };
