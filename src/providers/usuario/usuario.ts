import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Usuario } from '../../pages/models/usuario.model';


@Injectable()
export class UsuarioProvider {
  
  private estaElUsuarioLogueado;  // para saber si el usuario esta logueado
  public usuarioLogueado: Usuario;   // el usuario que se logueo

  constructor(public http: HttpClient) {
    console.log('Hello UsuarioProvider Provider');

    this.estaElUsuarioLogueado = false;  // la aplicacion empieza con ningun usuario logueado
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

  
  // seteamos el usuario como logueado, añadiendolo al localStorage
  setearUsuarioLogueado(usuario: Usuario) {
    this.estaElUsuarioLogueado = true;
    this.usuarioLogueado = usuario;
    localStorage.setItem('currentUser', JSON.stringify(usuario));
  }


  // obtenemos datos del usuario logueado, en localStorage
  obtenerUsuarioLogueado() {
  	return JSON.parse(localStorage.getItem('currentUser'));
  }

}
