import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { PasoProvider } from '../../providers/paso/paso';
import { Publicacion } from '../models/publicacion.model';
import { EditarpasoPage } from '../editarpaso/editarpaso';


@IonicPage()
@Component({
  selector: 'page-pasosdepublicaciones',
  templateUrl: 'pasosdepublicaciones.html',
})
export class PasosdepublicacionesPage {

  publicacion: Publicacion;
  pasos: any;
  imagesPath: string = "https://todaviasirve.azurewebsites.net/Content/Images/";
  loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public pasoProvider: PasoProvider,
    ) {

      this.publicacion = navParams.get("publi");
  }

  ionViewDidLoad() {
/*     this.loading = this.loadingCtrl.create({ content: " espere por favor..."});
    this.loading.present(); */

    this.pasoProvider.getPasosDePublicacion(this.publicacion.id)
    .subscribe(res => this.pasos = res);
    console.log("Publicacion: " +this.publicacion.id)
  }

  irAEditarPaso(paso){
    this.navCtrl.push(EditarpasoPage, { paso })
  }


  borrarPaso(idPaso) {
    this.pasoProvider.borrarPaso(idPaso)
      .subscribe(res => {
        this.ionViewDidLoad();
        this.presentToast("Eliminado Correctamente");
      },
        (error) => {
          this.presentToast("Eliminacion Falló");
        }
      );
    console.log("Se borro el paso:" + idPaso);
    
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
