import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { PublicacionProvider } from "../../providers/publicacion/publicacion";
import { DetallePage } from '../detalle/detalle';

import { UsuarioProvider } from "../../providers/usuario/usuario"; // para llamar al usuario logueado
import { Usuario } from '../models/usuario.model';  // para cargar en la interface usuario

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  publicaciones: any;
  prefixURL: string = "https://todaviasirve.azurewebsites.net/Content/Images/" ;

  userLog: Usuario;
  loading: any;
  
  constructor(  public navCtrl: NavController, 
                public publicacion: PublicacionProvider,
                public usuarioProvider: UsuarioProvider,
                public loadingCtrl: LoadingController
              ) {
      this.userLog = this.usuarioProvider.obtenerUsuarioLogueado()
  }

  ionViewDidLoad(){
    this.loading = this.loadingCtrl.create({ content: " espere por favor..."});
    this.loading.present();

    this.publicacion.obtenerTodasPublicaciones()
      .subscribe(
        (data) => { this.loading.dismiss(); this.publicaciones = data; },
        (error) => { this.loading.dismiss(); console.log(error); }
      )
  }

  irADetalle(publi){
    this.navCtrl.push(DetallePage, {publi});
   }


} // cierre clase HomePage
