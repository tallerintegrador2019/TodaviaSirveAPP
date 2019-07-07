import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class PasoProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PasoProvider Provider');
  }

  getPasosDePublicacion(idPublicacion: number) {
    return this.http.get("https://todaviasirve.azurewebsites.net/Api/Paso/Publicacion/" + idPublicacion)
    /* return this.http.get("http://localhost:55081/Api/Paso/Publicacion/" + idPublicacion) */
  }



}
