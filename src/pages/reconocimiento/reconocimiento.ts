import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
// imports necesarios


@IonicPage()
@Component({
  selector: 'page-reconocimiento',
  templateUrl: 'reconocimiento.html',
})
export class ReconocimientoPage {

   //Variables utilizadas en la aplicación

  //Apikey de google cloud vision
  googleCloudVisionAPIKey = "TUAPIKEY";
  //Para obtener las respuestas de google cloud vision
  labels: any[] = [];
  //Para dar vista previa a la imgen
  imagen: any = null;
  //Respuesta de google cloud vison
  resultado: any = null;
  //variable de control de si es o no es hotdog
  es: boolean = false;


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReconocimientoPage');
  }

}
