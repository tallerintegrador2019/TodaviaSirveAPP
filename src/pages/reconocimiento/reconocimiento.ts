import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
// imports necesarios

import { environment } from "../../environment";
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore} from 'angularfire2/firestore';

import { Observable } from 'rxjs/Observable';
import { tap, filter } from 'rxjs/operators';


@IonicPage()
@Component({
  selector: 'page-reconocimiento',
  templateUrl: 'reconocimiento.html',
})
export class ReconocimientoPage {

  googleCloudVisionAPIKey = "AIzaSyC8jo3niLqMKEfXi3KcN9ugz0WOP-RGPf0";
  key = "2b1be0711b74e5cf82b787e7c5f5dea89dd7abf0";

  //  // Upload task
  //  task: AngularFireUploadTask;

  //  // Firestore data
  //  result$: Observable<any>;
 
  //  loading: Loading;
  //  image: string;
 

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
    // private storage: AngularFireStorage,
    // private afs: AngularFirestore
  ) {
      let load = this.loader.create({
      content: 'Running AI vision analysis...'
    });
  }

  // startUpload(file: string) {

  //   // Show loader
  //   this.loading.present();

  //   // const timestamp = new Date().getTime().toString();
  //   const docId = this.afs.createId();

  //   const path = `${docId}.jpg`;

  //   // Make a reference to the future location of the firestore document
  //   const photoRef = this.afs.collection('photos').doc(docId)
    
  //   // Firestore observable
  //   this.result$ = photoRef.valueChanges()
  //       .pipe(
  //         filter(data => !!data),
  //         tap(_ => this.loading.dismiss())
  //       );

    
  //   // The main task
  //   this.image = 'data:image/jpg;base64,' + file;
  //   this.task = this.storage.ref(path).putString(this.image, 'data_url'); 
  // }


   // Gets the pic from the native camera then starts the upload
  //  async captureAndUpload() {
  //   const options: CameraOptions = {
  //     quality: 100,
  //     destinationType: this.camera.DestinationType.DATA_URL,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  //   }

  //   const base64 = await this.camera.getPicture(options)

  //   this.startUpload(base64);
  // }

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
    this.mostrarToast("entre", 5000);
    //Retornar la respuesta
  //  return this.http.post("https://vision.googleapis.com/v1/images:annotate?key="+environment.googleCloudVisionAPIKey, body)
   return this.http.post("https://vision.googleapis.com/v1/images:annotate?key="+this.googleCloudVisionAPIKey, body)
  
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
      this.imagen = img;
     

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
        console.log("salida del metodo dentro de resultados");
      }, err => {
        //Por si acaso ocurre un error
        loader.dismiss();
        this.mostrarToast(err.message, 5000);
        console.log("salida del por error de petision");
      });
    }, err => {
      //Por si acaso ocurre un error
      loader.dismiss();
      this.mostrarToast(err.message, 5000);
      console.log("salida del metodo por error de la camara");
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
