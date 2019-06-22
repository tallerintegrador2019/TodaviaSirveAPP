import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { YtProvider } from "../../providers/yt/yt";

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {

  publicacion
  imagenURL: string = "https://todaviasirve.azurewebsites.net/Content/Images/";

  videosEncontrados: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ytProvider: YtProvider) {
    this.publicacion = navParams.get("publi");
/* 
    this.ytProvider.obtenerVideos(this.publicacion.titulo).subscribe(res => this.videosEncontrados = res['items']);
 */
    console.log(this.videosEncontrados);
  }

  ionViewDidLoad() {

  }

} // cierre DetallePage
