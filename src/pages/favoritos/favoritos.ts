import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {PublicacionProvider} from '../../providers/publicacion/publicacion';
import {UsuarioProvider} from '../../providers/usuario/usuario';
import { DetallePage } from '../detalle/detalle';
/**
 * Generated class for the FavoritosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favoritos',
  templateUrl: 'favoritos.html',
})
export class FavoritosPage {
  publicaciones
  usuario
  prefixURL: string = "https://todaviasirve.azurewebsites.net/Content/Images/" ;
  loading: any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public usuarioProvider: UsuarioProvider,
    public loadingCtrl: LoadingController,
    public publicacionProvider: PublicacionProvider) {
      this.usuario = this.usuarioProvider.obtenerUsuarioLogueado();
      this.publicaciones = this.publicacionProvider.obtenerFavoritos(this.usuario.id);
  }

  ionViewDidLoad() {
    
    console.log('ionViewDidLoad FavoritosPage');
  }

  irADetalle(publi){
    this.navCtrl.push(DetallePage, {publi});
   }

}
