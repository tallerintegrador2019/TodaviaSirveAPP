import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
// imports necesarios

import { environment } from "../../environment";


@IonicPage()
@Component({
  selector: 'page-reconocimiento',
  templateUrl: 'reconocimiento.html',
})
export class ReconocimientoPage {

  /* googleCloudVisionAPIKey = "AIzaSyC8jo3niLqMKEfXi3KcN9ugz0WOP-RGPf0"; */

  labels: any[] = [];
  imagen: any = null;
  resultado: any = null;
  es: boolean = false;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: Http,
    public loader: LoadingController,
    private camera: Camera,
    public toast: ToastController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReconocimientoPage');
  }

  getLabels(base64) {
    const body = {
      "requests": [
        {
          "image": {
            "content": base64
          },
          "features": [
            {
              "type": "LABEL_DETECTION"
            }
          ]
        }
      ]
    }
    //Retornar la respuesta
    return this.http.post("https://vision.googleapis.com/v1/images:annotate?key="+environment.googleCloudVisionAPIKey, body)
  }

  //Funcion para abrir la camara y procesar la imagen
  tomarFoto() {

    let loader = this.loader.create({
      content: 'Ejecutando analisis...'
    });

    //Mostrar loader
    loader.present();

    const opciones: CameraOptions = {
      quality: 100,
      targetHeight: 500,
      targetWidth: 500,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    }

    //Abirmos la camara pasando las opciones antes estipuladas
    this.camera.getPicture(opciones).then((img) => {
      this.labels = [];
      this.es = false;
      //Hacemos la petición a google cloud vision
      this.getLabels(img).subscribe((resultados) => {
        //Hacemos la variable imagen igual a la imagen obtenida por la camara para mostrar la vista previa
        this.imagen = img;
        //Obtenemos los resultados que nos da google
        this.resultado = resultados.json().responses;
        //Recorremos las etiquetas de la respuesta con map()
        this.resultado[0].labelAnnotations.map(obj => {
          //Guardamos las etiquetas en la variable labels
          this.labels.push(obj.description);
          //Si algunas de las etiquetas es "hot dog" entonces es un hot dog
          if (obj.description == "hot dog") this.es = true;
        });
        //Quitamos el loader
        loader.dismiss();
      }, err => {
        //Por si acaso ocurre un error
        loader.dismiss();
        this.mostrarToast(err.message, 5000);
      });
    }, err => {
      //Por si acaso ocurre un error
      loader.dismiss();
      this.mostrarToast(err.message, 5000);
    });
  }

  //Funcion para mostrar mensaje de error recibe mensaje de error y la duración de el mensaje
  mostrarToast(mensaje: string, duracion: number) {
    this.toast.create({
      message: mensaje,
      duration: duracion
    }).present();
  }
 



} // cierre de la clase
