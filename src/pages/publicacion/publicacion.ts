import { Component, OnInit} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/**
 * Generated class for the PublicacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-publicacion',
  templateUrl: 'publicacion.html',
})
export class PublicacionPage implements OnInit {
  
  titulo = "";
  subtitulo = "";
  descripcion = "";
  descripcion1= "";
  descripcion2= "";
  imagen;
  imagen1;
  imagen2;
  sendformpublicacion: FormGroup;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
  }

  ngOnInit(): void {

    // let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

    this.sendformpublicacion = new FormGroup({
      /* nombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
      apellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]), */
      descripcion: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]),
      titulo: new FormControl('', [Validators.required,Validators.minLength(4), Validators.maxLength(20)]),
      subtitulo: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]),
      descripcion1: new FormControl('', [Validators.required,Validators.minLength(4), Validators.maxLength(20)]),
      descripcion2: new FormControl('', [Validators.required,Validators.minLength(4), Validators.maxLength(20)]),

    });
  }

  onFileChanged(event) {
    this.imagen = event.target.files[0];
  }

  submitPublicacion() {
    /* let pathURL = "http://localhost:55081/Api/Usuario" */
    let pathURL = "http://todaviasirve.azurewebsites.net//Api/Usuario"

    let headers = new HttpHeaders();
    headers.append('enctype', 'multipart/form-data;'); 
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');

    var formData = new FormData();
    formData.append("titulo", this.titulo);
    formData.append("subtitulo", this.subtitulo);
    formData.append("descripcion", this.descripcion);
    formData.append("descripcion1", this.descripcion1);
    formData.append("descripcion2", this.descripcion2);
    formData.append("portada", this.imagen);
    formData.append("imagen1", this.imagen1);
    formData.append("imagen2", this.imagen2);

    this.http.post( pathURL, formData, { headers: headers } )
      .subscribe(res => { alert("success " + res); },
        (err) => { alert("failed"); }
      );

    console.log(formData);

  } // cierre metodo
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicacionPage');
  }

}
