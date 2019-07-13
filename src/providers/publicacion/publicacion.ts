import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Injectable, Component, NgModule } from '@angular/core';
import 'rxjs/add/operator/map';

import { Publicacion } from "../../pages/models/publicacion.model";
import { Paso } from '../../pages/models/paso.model';
import { ComentarioCantidad } from '../../pages/models/ComentarioCantidad.model';


@Injectable()
export class PublicacionProvider {

  constructor(public http: HttpClient
  ) {

  }

  obtenerTodasPublicaciones() {
    return this.http.get("https://todaviasirve.azurewebsites.net/api/Publicacion")
    /* return this.http.get("http://localhost:55081/Api/Publicacion")  */
  }

  obtenerPublicacion(id) {
    return this.http.get("https://todaviasirve.azurewebsites.net/api/Publicacion/" + id)
  }

  buscarPublicacion(titulo: string) {
    return this.http.get("https://todaviasirve.azurewebsites.net/api/Publicacion/Buscar/" + titulo)
    /*    return this.http.get("http://localhost:55081/api/Publicacion/Buscar/" + titulo) */
  }

  // BORRAR PUBLICACION
  borrarPublicacion(idPubli) {
    return this.http.delete("https://todaviasirve.azurewebsites.net/api/Publicacion/" + idPubli);
    /* return this.http.delete("http://localhost:55081/api/Publicacion/" + idPubli) */
  }

  // EDITAR PUBLICACION
  editarPublicacion(publi: Publicacion) {

    let pathURL = "http://todaviasirve.azurewebsites.net/Api/Publicacion/" + publi.id;
    /* let pathURL = "http://localhost:55081/Api/Publicacion/" + publi.id; */

    const headers = new HttpHeaders()
      .set('enctype', 'multipart/form-data;charset=UTF-8')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
      .set('Accept-Charset', 'utf-8')

    var formData = new FormData();
    formData.append("titulo", publi.titulo);
    formData.append("subtitulo", publi.subtitulo);
    formData.append("descripcion", publi.descripcion);
    formData.append("fechaSubida", publi.fechaSubida);
    formData.append("imagenPortada", publi.imagenPortada);

    return this.http.put(pathURL, formData, { headers: headers })
    .subscribe(res => res ); 

  }

  // SUBIR PUBLICACION
  subirPublicacion(publi: Publicacion, id: string) {
    let pathURL = "http://todaviasirve.azurewebsites.net/Api/Publicacion/";
    /* let pathURL = "http://localhost:55081/Api/Publicacion/";  */

    const headers = new HttpHeaders()
      .set('enctype', 'multipart/form-data;charset=UTF-8')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
      .set('Accept-Charset', 'utf-8')

    var formData = new FormData();
    formData.append("titulo", publi.titulo);
    formData.append("subtitulo", publi.subtitulo);
    formData.append("descripcion", publi.descripcion);
    formData.append("fechaSubida", publi.fechaSubida);
    formData.append("imagenPortada", publi.imagenPortada);
    formData.append("usuarioPublicacion", id);
    /* this.http.post(pathURL, formData, { headers: headers })
      .subscribe(res => { alert("success " + res); },
        (err) => { alert("failed"); }
      ); */

    return this.http.post(pathURL, formData, { headers: headers });
  }

        // SUBIR PUBLICACION Fix para subir publicacion y usuario
  //  subirPublicacion(publi: Publicacion) {
  //   let pathURL = "http://todaviasirve.azurewebsites.net/Api/Publicacion/";
  //   /* let pathURL = "http://localhost:55081/Api/Publicacion/";  */

  //   const headers = new HttpHeaders()
  //     .set('enctype', 'multipart/form-data;charset=UTF-8')
  //     .set('Access-Control-Allow-Origin', '*')
  //     .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
  //     .set('Accept-Charset', 'utf-8')

  //   var formData = new FormData();
  //   formData.append("titulo", publi.titulo);
  //   formData.append("subtitulo", publi.subtitulo);
  //   formData.append("descripcion", publi.descripcion);
  //   formData.append("fechaSubida", publi.fechaSubida);
  //   formData.append("imagenPortada", publi.imagenPortada);
  //   formData.append("usuarioPublicacion", publi.idUsuario);
  //   /* this.http.post(pathURL, formData, { headers: headers })
  //     .subscribe(res => { alert("success " + res); },
  //       (err) => { alert("failed"); }
  //     ); */

  //   return this.http.post(pathURL, formData, { headers: headers });
  // }


  // SUBIR PASOS
  subirPaso(paso: Paso, idPublicacion) {
    let pathURL = "http://todaviasirve.azurewebsites.net/Api/Paso/";
    /* let pathURL = "http://localhost:55081/Api/Paso/"; */

    const headers = new HttpHeaders()
      .set('enctype', 'multipart/form-data;charset=UTF-8')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
      .set('Accept-Charset', 'utf-8')

    var formData = new FormData();
    formData.append("numero", paso.numero);
    formData.append("descripcion", paso.descripcion);
    formData.append("imagen", paso.imagen);
    formData.append("idPublicacion", idPublicacion);

    this.http.post(pathURL, formData, { headers: headers })
      .subscribe(res => {
        console.log("Subido: " + res);
      },
        (error) => {
          console.log(error);
          alert("Se ha producido un error: " + error);
        }
      );

  }


  //OBTENER LAS PUBLICACIONES DE UN USUARIO
  obtenerPublicacionesUsuario(id) {
    return this.http.get("https://todaviasirve.azurewebsites.net/Api/Publicacion/PublicacionesUsuario/" + id)
    /* return this.http.get("http://localhost:55081/Api/Publicacion/PublicacionesUsuario/" + id)  */
  }

  eliminarPublicacion(idPublicacion, idUsuario) {
    console.log("por eliminar publicacion con este id : " + idPublicacion);
    return this.http.delete("http://localhost:55081/Api/Publicacion/PublicacionesUsuario/" + idUsuario)
    /* return this.http.get("http://localhost:55081/Api/Publicacion/DeletePublicacionUsuario/"+idPublicacion+"/"+idUsuario)  */
  }

  obtenerComentarioPublicacion(idPublicacion){
    console.log("buscar comentarios de esta publicacion "+ idPublicacion);
    return this.http.get<ComentarioCantidad>("https://todaviasirve.azurewebsites.net/Api/Publicacion/obtenerComentarioPublicacion/"+idPublicacion)    
    // return this.http.get<ComentarioCantidad>("http://localhost:55081/Api/Publicacion/obtenerComentarioPublicacion/"+idPublicacion)
  }

  // obtenerTodasPublicaciones2() {
  //   //return this.http.get("https://todaviasirve.azurewebsites.net/api/Publicacion")
  //   return this.http.get("http://localhost:55081/api/Publicacion/")  
  // }

} // cierre clase