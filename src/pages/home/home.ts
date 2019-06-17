import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PublicacionProvider } from "../../providers/publicacion/publicacion";
import { DetallePage } from '../detalle/detalle';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  publicaciones: any;
  prefixURL: string = "https://todaviasirve.azurewebsites.net/Content/Images/" ;
  
  constructor(public navCtrl: NavController, public publicacion: PublicacionProvider) {
  
  }

  ionViewDidLoad(){
    this.publicacion.obtenerTodasPublicaciones()
      .subscribe(
        (data) => { this.publicaciones = data; },
        (error) => { console.log(error); }
      )
  }

  irADetalle(publi){
    this.navCtrl.push(DetallePage, {publi});
   }


} // cierre clase HomePage
