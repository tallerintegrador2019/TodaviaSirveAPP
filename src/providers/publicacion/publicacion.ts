import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable, Component, NgModule } from '@angular/core';
import { ReturnStatement } from '@angular/compiler';
import 'rxjs/add/operator/map';

import { Publicacion } from "../../pages/models/publicacion.model";
import { Paso } from '../../pages/models/paso.model';


@Injectable()
export class PublicacionProvider {

  constructor(public http: HttpClient
  ) {

  }

  obtenerTodasPublicaciones() {
    return this.http.get("https://todaviasirve.azurewebsites.net/api/Publicacion")
  }

  obtenerPublicacion(id) {
    return this.http.get("https://todaviasirve.azurewebsites.net/api/Publicacion/" + id)
  }

  buscarPublicacion(titulo: string) {
    return this.http.get("https://todaviasirve.azurewebsites.net/api/Publicacion/Buscar/" + titulo)
  }

  subirPublicacion(publi: Publicacion) {
    let pathURL = "http://localhost:55081/Api/Publicacion/";

    const headers = new HttpHeaders()
      /* .set('Content-Type', 'application/json;charset=UTF-8') */
      .set('enctype', 'multipart/form-data;charset=UTF-8')
      .set('Accept-Charset', 'utf-8')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')

    var formData = new FormData();
    formData.append("titulo", publi.titulo);
    formData.append("subtitulo", publi.subtitulo);
    formData.append("descripcion", publi.descripcion);
    formData.append("fechaSubida", publi.fechaSubida);
    formData.append("imagenPortada", publi.imagenPortada);

    /* this.http.post(pathURL, formData, { headers: headers })
      .subscribe(res => { alert("success " + res); },
        (err) => { alert("failed"); }
      ); */

    return this.http.post(pathURL, formData,  { headers: headers })
  }


  subirPaso(paso: Paso) {
    let pathURL = "http://localhost:55081/Api/Paso/";

    const headers = new HttpHeaders()
      /* .set('Content-Type', 'application/json;charset=UTF-8') */
      .set('enctype', 'multipart/form-data;charset=UTF-8')
      .set('Accept-Charset', 'utf-8')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')

    var formData = new FormData();
    formData.append("numero", paso.numero);
    formData.append("descripcion", paso.descripcion);
    formData.append("imagen", paso.imagen);

    this.http.post(pathURL, formData, { headers: headers })
      .subscribe(res => { alert("success " + res); },
        (err) => { alert("failed"); }
      );

    console.log(paso);
  }


} // cierre clase