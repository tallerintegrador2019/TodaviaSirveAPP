import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {PublicacionProvider} from '../../providers/publicacion/publicacion';
import {Publicacion} from '../models/publicacion.model';
import { UsuarioProvider } from '../../providers/usuario/usuario';
//import { Usuario } from '../models/usuario.model';
/**
 * Generated class for the MisPublicacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mis-publicaciones',
  templateUrl: 'mis-publicaciones.html',
})
export class MisPublicacionesPage {
  loading: any;
  usuario ;
  publicaciones: any = "";;
  constructor(public navCtrl: NavController, public navParams: NavParams,
                public publicacionProvider: PublicacionProvider,
                public usuarioProvider: UsuarioProvider,
                public loadingCtrl: LoadingController
              ) {

    this.usuario = this.usuarioProvider.obtenerUsuarioLogueado();
    this.publicaciones =  this.publicacionProvider.obtenerPublicacionesUsuario(this.usuario.id);
  }

  


  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({ content: " espere por favor..."});
    this.loading.present();

    // this.publicacionProvider.obtenerPublicacionesUsuario(this.usuario.id)
    //   .subscribe(
    //     (data) => { this.loading.dismiss(); this.publicaciones = data; },
    //     (error) => { this.loading.dismiss(); console.log(error); }
    //   )
    
    console.log(this.usuario.id);
    this.loading.dismiss();
    console.log(this.publicaciones);
    console.log('ionViewDidLoad MisPublicacionesPage');
  }

}
