import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, Component, NgModule } from '@angular/core';
import { ReturnStatement } from '@angular/compiler';
import 'rxjs/add/operator/map';


@Injectable()
export class PublicacionProvider {

  constructor(public http: HttpClient) {

  }

  obtenerTodasPublicaciones(){
    return this.http.get("http://localhost:55081/api/Publicacion")
  }

  obtenerPublicacion(id){
    return this.http.get("http://localhost:55081/api/Publicacion/" + id)
  }

  buscarPublicacion(titulo: string){
    return this.http.get("http://localhost:55081/api/Publicacion/Buscar/" + titulo)
  }


} 