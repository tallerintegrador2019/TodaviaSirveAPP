import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { YtProvider } from "../../providers/yt/yt";

import { ImageViewerController } from 'ionic-img-viewer';

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {

  publicacion
  imagenURL: string = "https://todaviasirve.azurewebsites.net/Content/Images/";

  videosEncontrados: any;

  _imageViewerCtrl: ImageViewerController

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ytProvider: YtProvider,
    imageViewerCtrl: ImageViewerController
  ) {

    this._imageViewerCtrl = imageViewerCtrl;

    this.publicacion = navParams.get("publi");

    this.ytProvider.obtenerVideos(this.publicacion.titulo).subscribe(res => this.videosEncontrados = res['items']);

    console.log(this.videosEncontrados);
  }

  ionViewDidLoad() {

  }

  presentImage(myImage) {
    const imageViewer = this._imageViewerCtrl.create(myImage);
    imageViewer.present();

    setTimeout(() => imageViewer.dismiss(), 1000);
    imageViewer.onDidDismiss(() => alert('Viewer dismissed'));
  }



} // cierre DetallePage
