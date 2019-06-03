import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReturnStatement } from '@angular/compiler';

/*
  Generated class for the PublicacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PublicacionProvider {

  constructor(public http: HttpClient) {
    console.log('Hello PublicacionProvider Provider');
  }

  obtenerTodasPublicaciones(){
    return this.http.get("http://localhost:55081/api/Publicacion")
  }

  obtenerPublicacion(id){
    return this.http.get("http://localhost:55081/api/Publicacion/id")
  }

}
