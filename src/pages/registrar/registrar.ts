import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {

  username
  pass
  nombre
  apellido
  email
  imagen

  imageURI: any;
  imageTitle: any;
  isImageSelected:boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, public camera: Camera, private transfer: FileTransfer, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {

  }

  chooseFile() {
    let options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: false
    };
   
    this.camera.getPicture(options).then((img) => {
      this.imageURI = img;
      this.isImageSelected =true;
    }).catch((reason) => {
      console.log(reason);
    });

  }

  doImageUpload() {
    let loader = this.loadingCtrl.create({ content: "Subiendo..." });
    loader.present();
    
    let filename = this.imageURI.split('/').pop();
    const fileTransfer: FileTransferObject = this.transfer.create();
 
    let options: FileUploadOptions = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "image/jpg",
      params: { 'title': this.imageTitle }
    };
 
    fileTransfer.upload(this.imageURI, "http://todaviasirve.azurewebsites.net/api/usuario",options)
      .then((res)=>{
        },(err)=>{
          console.log(err);
      });
 
  } 

  submitUsuario() {

    let headers = new HttpHeaders();
  /*   headers.append('Content-Type', 'application/json'); */
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');

    let data = JSON.stringify({
      username: this.username,
      pass: this.pass,
      nombre: this.nombre,
      apellido: this.apellido,
      email: this.email,
      imagen: this.imagen
    });

    this.http.post( "http://todaviasirve.azurewebsites.net/Api/Usuario",
                    data,
                    { headers: {'Content-Type': 'application/json'} }
                  )
      .subscribe(res => { alert("success " + res); },
        (err) => { alert("failed"); }
      );

      console.log(data);



  } // cierre metodo




} // cierre clase
