import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { LoadingController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-camara',
  templateUrl: 'camara.html',
})
export class CamaraPage {

  image: string = null;
  loading

  encontrado
  datos = ["aaaaa", "bbbbbb", "cccccc", "ddddddd", "eeeeee", "ffffff"]

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private http: HttpClient,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CamaraPage');
  }

/*       
    // DESDE LA CAMARA DEL CELULAR ----------------
    getPicture() {
    
        const options: CameraOptions = {
          quality: 75,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE
        }
    
        this.camera.getPicture(options).then((imageData) => {
          // imageData is either a base64 encoded string or a file URI
          // If it's base64 (DATA_URL):
          this.image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
          // Handle error
        });
  
        this.subirAAPI();
    
      } */


  // DESDE ARCHIVO ----------------------
  getPicture(event) {
    this.image = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.image = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);

    /* this.subirAAPI(); */
  }


  subirAAPI() {

    this.loading = this.loadingCtrl.create({ content: " espere por favor..."});
    this.loading.present();

    let pathURL = "https://brazilsouth.api.cognitive.microsoft.com/vision/v1.0/analyze?language=es&visualFeatures=tags"
    let apiKey = "a84d243e248d4e67aee85fce8cace729";

    const headers = new HttpHeaders()
      .set('Ocp-Apim-Subscription-Key', apiKey)
      .set('enctype', 'multipart/form-data;charset=UTF-8')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')

    var formData = new FormData();
    formData.append("image", this.image);

    this.http.post(pathURL, formData, { headers: headers })
      .subscribe(res => {
        this.loading.dismiss();
        this.encontrado = res['tags']
      });

  }


} // cierre clase
