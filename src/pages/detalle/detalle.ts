import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { YtProvider } from "../../providers/yt/yt";
import { PasoProvider } from '../../providers/paso/paso';

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {

  publicacion
  imagenURL: string = "https://todaviasirve.azurewebsites.net/Content/Images/";
  videosEncontrados: any;

  pasos

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ytProvider: YtProvider,
    public pasoProvider: PasoProvider,
  ) {

    this.publicacion = navParams.get("publi");

    // API PARA TRAER LOS VIDEOS DE YOUTUBE
    /* this.ytProvider.obtenerVideos(this.publicacion.titulo).subscribe(res => this.videosEncontrados = res['items']); */
  }

  ionViewDidLoad() {
    this.pasoProvider.getPasosDePublicacion(this.publicacion.id)
      .subscribe(res => this.pasos = res)

  }





} // cierre DetallePage
