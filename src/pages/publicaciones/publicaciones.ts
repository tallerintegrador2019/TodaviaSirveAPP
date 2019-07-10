import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { PublicacionProvider } from '../../providers/publicacion/publicacion';
import { DetallePage } from '../detalle/detalle';
import { EditarpublicacionPage } from '../editarpublicacion/editarpublicacion';
import { PasosdepublicacionesPage } from '../pasosdepublicaciones/pasosdepublicaciones';



@IonicPage()
@Component({
  selector: 'page-publicaciones',
  templateUrl: 'publicaciones.html',
})
export class PublicacionesPage {

  publicaciones: any;
  imagesPath: string = "https://todaviasirve.azurewebsites.net/Content/Images/";
  loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public publicacionProvider: PublicacionProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
  ) {
  }


  ionViewDidLoad() {
    this.loading = this.loadingCtrl.create({ content: " espere por favor..."});
    this.loading.present();

    this.publicacionProvider.obtenerTodasPublicaciones()
      .subscribe(
        (data) => {
          this.publicaciones = data;
          this.loading.dismiss(); 
        },
        (error) => {
          console.log(error);
          this.loading.dismiss(); 
        }
      )
  }

  irADetalle(publi) {
    this.navCtrl.push(DetallePage, { publi });
  }

  borrarPublicacion(idPubli) {
    this.publicacionProvider.borrarPublicacion(idPubli)
      .subscribe(res => {
        this.ionViewDidLoad();
        this.presentToast("Eliminado Correctamente");
      },
        (error) => {
          this.presentToast("Eliminacion Falló" + error);
        }
      );
    console.log("Se borro la publicacion:" + idPubli);
    
  }

  irAEditarPublicacion(publi){
    this.navCtrl.push(EditarpublicacionPage, { "publi" : publi } );
  }

  irAPasosDePublicacion(publi){
    this.navCtrl.push(PasosdepublicacionesPage, { "publi" : publi } );
  }

  presentToast(msj: string) {
    const toast = this.toastCtrl.create({
      message: msj,
      duration: 3000,
      position: 'top',      
    });

    toast.present();
  }

  doRefresh(refresher) {
    this.ionViewDidLoad();

    setTimeout(() => {
      refresher.complete();
    }, 500);
  }

}
