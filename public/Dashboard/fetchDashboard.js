export function atualizarMapa() {
    // Obtém a nova latitude e longitude
    latitude = parseFloat(sessionStorage.getItem("latitudeEmpresa"));
    longitude = parseFloat(sessionStorage.getItem("longitudeEmpresa"));

    // Se a latitude e longitude forem válidas, atualiza o marcador
    if (!isNaN(latitude) && !isNaN(longitude)) {
        marker.setLatLng([latitude, longitude]);  // Atualiza a posição do marcador
        map.setView([latitude, longitude], map.getZoom());  // Centraliza o mapa na nova posição
    }
}


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
    console.log(cidadeCodificada)
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

export { buscarLongitudeLatitude, buscarEmpresaPorCidade };
