import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';

import { Usuario } from "../models/usuario.model";


@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  userlog: Usuario;

  constructor(public navCtrl: NavController, public navParams: NavParams, public usuarioProvider: UsuarioProvider) {
    this.userlog = this.usuarioProvider.obtenerUsuarioLogueado()
  }

  ionViewDidLoad() {

  }

}
