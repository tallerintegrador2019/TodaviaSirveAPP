import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PublicacionProvider } from "../../providers/publicacion/publicacion";

/**
 * Generated class for the DetallePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {

  publicacion

  constructor(public navCtrl: NavController, public navParams: NavParams, public publicacionService: PublicacionProvider) {
  }

  ionViewDidLoad() {
    /* this.publicacion = this.publicacionService.obtenerPublicacion("id"); */
    console.log('enviado..');
  }

}
