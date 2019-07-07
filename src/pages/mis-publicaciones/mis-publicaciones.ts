import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController,ActionSheetController   } from 'ionic-angular';
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
  valor: any = "";
  publicaciones: any = "";;
  constructor(public navCtrl: NavController, public navParams: NavParams,
                public publicacionProvider: PublicacionProvider,
                public usuarioProvider: UsuarioProvider,
                public loadingCtrl: LoadingController,
                public actionsheetCtrl: ActionSheetController
              ) {

    this.usuario = this.usuarioProvider.obtenerUsuarioLogueado();
    this.publicaciones =  this.publicacionProvider.obtenerPublicacionesUsuario(this.usuario.id);
    this.valor = this.publicacionProvider.obtenerPublicacionesUsuario(this.usuario.id);
  }

  openMenu(publicacionClickeada) {
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Acciones',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Borrar',
          icon: 'trash',
          handler: () => {
            console.log(publicacionClickeada.id);
            console.log('Delete clicked');
            //this.llamadaEliminarPublicacion(publicacionClickeada.id);
            this.publicaciones =  this.publicacionProvider.eliminarPublicacion(publicacionClickeada.id,this.usuario.id);
          }
        },
        {
          text: 'Ver',
          handler: () => {
            console.log('Share clicked');
          }
        },
        {
          text: 'Ranking',
          handler: () => {
            console.log('Play clicked');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel', // will always sort to be on the botton
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
  
  llamadaEliminarPublicacion(id){
    console.log("estoy llamando a elimar");
    this.valor =  this.publicacionProvider.eliminarPublicacion(id);
    this.recargarPublicaciones();
  }

  recargarPublicaciones(){
    //this.publicaciones =  this.publicacionProvider.obtenerPublicacionesUsuario(this.usuario.id);
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
