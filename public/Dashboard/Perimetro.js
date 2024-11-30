export class Perimetro {
    constructor (latitude, longitude){
        this.latitude = latitude;
        this.longitude = longitude;
    }

 /**
    @param {Object} map
   */

  aparecerCirculoNoMapa(map) {
    
    L.circle([this.latitude, this.longitude], {
      color: "red", 
      fillColor: "lightred",
      fillOpacity: 0.4, 
      radius: 50000, 
    }).addTo(map);
  }
}
 