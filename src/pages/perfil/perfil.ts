import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';

import { Usuario } from "../models/usuario.model";
import { EditarusuarioPage } from '../editarusuario/editarusuario';


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {
/* 
  usuarioLogueado: Usuario = JSON.parse(localStorage.getItem('currentUser')); */
  usuarioLogueado

  constructor(  public navCtrl: NavController, 
                public navParams: NavParams, 
                public usuarioProvider: UsuarioProvider
              ) {
                
    this.usuarioLogueado = this.usuarioProvider.obtenerUsuarioLogueado();
    console.log(this.usuarioLogueado);
  }

  ionViewDidLoad() {
    
  }

  irAEditarUsuario(){
    this.navCtrl.push(EditarusuarioPage);
  }

}
