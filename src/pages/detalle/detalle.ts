import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {

  publicacion
  imagenURL: string = "https://todaviasirve.azurewebsites.net/Content/Images/" ;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.publicacion = navParams.get("publi");
  }

  ionViewDidLoad() {

  }

}
