import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Usuario } from '../../pages/models/usuario.model';


@Injectable()
export class UsuarioProvider {
  
  private estaElUsuarioLogueado;
  public usuarioLogueado: Usuario;

  constructor(public http: HttpClient) {
    console.log('Hello UsuarioProvider Provider');

    this.estaElUsuarioLogueado = false;
  }

  obtenerTodosUsuarios(){
    return this.http.get("https://todaviasirve.azurewebsites.net/api/Usuario")
  }

  obtenerUsuario(id){
    return this.http.get("https://todaviasirve.azurewebsites.net/api/Usuario/" + id)
  }

  // aun no esta creado en el api
  buscarUsuario(dato: string){
    return this.http.get("https://todaviasirve.azurewebsites.net/api/Usuario/Buscar/" + dato)
  }

  
  setearUsuarioLogueado(usuario: Usuario) {
    this.estaElUsuarioLogueado = true;
    this.usuarioLogueado = usuario;
    localStorage.setItem('currentUser', JSON.stringify(usuario));
  }

  obtenerUsuarioLogueado() {
  	return JSON.parse(localStorage.getItem('currentUser'));
  }

}
