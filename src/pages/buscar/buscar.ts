import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PublicacionProvider } from "../../providers/publicacion/publicacion";
import { DetallePage } from '../detalle/detalle';


@IonicPage()
@Component({
  selector: 'page-buscar',
  templateUrl: 'buscar.html',
})
export class BuscarPage {

  publicaciones: any;
  prefixURL: string = "https://todaviasirve.azurewebsites.net/Content/Images/" ;
  titulo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public publicacionService: PublicacionProvider) {
  }

  ionViewDidLoad() {
  }

  buscarPublicacion(){
    this.publicaciones = this.publicacionService.buscarPublicacion(this.titulo)    
  }

  irADetalle(publi){
    this.navCtrl.push(DetallePage, {publi});
   }



} // cierre clase
