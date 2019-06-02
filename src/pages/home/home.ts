import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { PublicacionProvider } from "../../providers/publicacion/publicacion";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  publicaciones

  constructor(public navCtrl: NavController, public publicacion: PublicacionProvider) {
  
  }

  ionViewDidLoad(){
    this.publicacion.obtenerDatos()
    .subscribe(
      (data) => { this.publicaciones = data; },
      (error) => { console.log(error); }
    )
    
  }


} // cierre clase HomePage
