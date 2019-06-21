import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Observable } from 'rxjs/Observable';


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

  data

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public camera: Camera,
    private transfer: FileTransfer,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {

  }


  submitUsuario() {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('enctype', 'multipart/form-data'); 
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

    this.http.post("http://localhost:55081/Api/Usuario",
      data,
      { headers: { 'Content-Type': 'application/json'  } }
    )
      .subscribe(res => { alert("success " + res); },
        (err) => { alert("failed"); }
      );

    console.log(data);



  } // cierre metodo




} // cierre clase
