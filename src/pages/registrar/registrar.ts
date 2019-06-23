import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-registrar',
  templateUrl: 'registrar.html',
})
export class RegistrarPage {

  username ="";
  pass="";
  nombre="";
  apellido="";
  email="";
  imagen;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient
  ) {
  }

  
  ionViewDidLoad() {

  }


  submitUsuario() {


    /* let pathURL = "http://localhost:55081/Api/Usuario" */
    let pathURL = "http://todaviasirve.azurewebsites.net//Api/Usuario"

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('enctype', 'multipart/form-data;charset=UTF-16'); 
    headers.append('Accept-Charset', 'utf-8'); 
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');

    var formData = new FormData();
    formData.append("username", this.username);
    formData.append("pass", this.pass);
    formData.append("nombre", this.nombre);
    formData.append("apellido", this.apellido);
    formData.append("email", this.email);
    formData.append("imagen", this.imagen);

    this.http.post( pathURL, formData, { headers: headers } )
      .subscribe(res => { alert("success " + res); },
        (err) => { alert("failed"); }
      );

    console.log(formData);

  } // cierre metodo
  

  onFileChanged(event) {
    this.imagen = event.target.files[0];
  }



} // cierre clase
