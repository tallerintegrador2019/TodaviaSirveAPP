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
  prefixURL: string = "http://localhost:55081/" ;
  
  constructor(public navCtrl: NavController, public publicacion: PublicacionProvider) {
  
  }

  ionViewDidLoad(){
    this.publicacion.obtenerTodasPublicaciones()
    .subscribe(
      (data) => { this.publicaciones = data; },
      (error) => { console.log(error); }
    )

  }

  irADetalle(){
    this.navCtrl.push(DetallePage);
   }
    


} // cierre clase HomePage
