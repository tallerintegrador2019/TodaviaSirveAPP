import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { PublicacionProvider } from "../../providers/publicacion/publicacion";
import { DetallePage } from '../detalle/detalle';

import { UsuarioProvider } from "../../providers/usuario/usuario"; // para llamar al usuario logueado
import { Usuario } from '../models/usuario.model';  // para cargar en la interface usuario

import { PopoverController } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';
import { CamaraPage } from '../camara/camara';

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
                public loadingCtrl: LoadingController,
                public popoverCtrl: PopoverController
              ) {
      this.userLog = this.usuarioProvider.obtenerUsuarioLogueado()
  }

  ionViewDidLoad(){
    this.loading = this.loadingCtrl.create({ content: " espere por favor..."});
    this.loading.present();

    this.publicacion.obtenerTodasPublicaciones()
      .subscribe(
        (data) => { 
          this.publicaciones = data;
          this.loading.dismiss(); 
        },
        (error) => { 
          this.loading.dismiss(); 
          console.log(error); 
        }
      )
  }

  irADetalle(publi){
    this.navCtrl.push(DetallePage, {publi});
   }


   presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PerfilPage);
    popover.present({
      ev: myEvent
    });
  }

  irACamara(){
    this.navCtrl.push(CamaraPage)
  }


} // cierre clase HomePage
