import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, Slides } from 'ionic-angular';
import { PublicacionProvider } from "../../providers/publicacion/publicacion";
import { DetallePage } from '../detalle/detalle';

import { UsuarioProvider } from "../../providers/usuario/usuario"; // para llamar al usuario logueado
import { Usuario } from '../models/usuario.model';  // para cargar en la interface usuario

import { PopoverController } from 'ionic-angular';
import { PerfilPage } from '../perfil/perfil';
import { CamaraPage } from '../camara/camara';
import { TipsProvider } from '../../providers/tips/tips';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;

  publicaciones: any;
  prefixURL: string = "https://todaviasirve.azurewebsites.net/Content/Images/" ;

  userLog: Usuario;
  loading: any;

  sabiasque
  
  constructor(  public navCtrl: NavController, 
                public publicacion: PublicacionProvider,
                public usuarioProvider: UsuarioProvider,
                public loadingCtrl: LoadingController,
                public popoverCtrl: PopoverController,
                public tipsProvider: TipsProvider,
              ) {
      this.userLog = this.usuarioProvider.obtenerUsuarioLogueado()
  }

  ionViewDidEnter() {
   /*  this.slides.autoplayDisableOnInteraction = true */
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

    this.obtenerTip();
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

  doRefresh(refresher) {
    this.ionViewDidLoad();

    setTimeout(() => {
      refresher.complete();
    }, 500);
  }

  obtenerTip(){
    this.tipsProvider.obtenerTip()
      .subscribe((res) => {
        this.sabiasque = res["descripcion"];
      },
      (error) => {
        console.log("Error: " + error)
      })
  }


} // cierre clase HomePage
