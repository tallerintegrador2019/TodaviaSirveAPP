import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';


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


  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ionViewDidLoad() {

  }

  submitUsuario() {

/* 
     let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
 */


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
