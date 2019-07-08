import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { YtProvider } from "../../providers/yt/yt";
import {UsuarioProvider} from "../../providers/usuario/usuario";
import { HttpClient, HttpHeaders } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html',
})
export class DetallePage {

  publicacion;
  imagenURL: string = "https://todaviasirve.azurewebsites.net/Content/Images/";
  videosEncontrados: any;
  signupform: FormGroup;
  valor : string = null ; 
  comentario = "";
  usuario;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ytProvider: YtProvider,
    public http: HttpClient,
    public usuarioProv : UsuarioProvider
  ) {

    this.publicacion = navParams.get("publi");

    this.ytProvider.obtenerVideos(this.publicacion.titulo).subscribe(res => this.videosEncontrados = res['items']);
    this.usuario = this.usuarioProv.obtenerUsuarioLogueado();
    console.log(this.videosEncontrados);
  }

  ionViewDidLoad() {

  }

  cargarPublicacion(){
    this.valor = "Cargado";
    console.log(this.valor);
    this.signupform = new FormGroup({
      comentario: new FormControl('', [Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)])
    });
  }

  submitComentario(){
    //  let pathURL = "http://localhost:55081/Api/Usuario"
    // // let pathURL = "http://todaviasirve.azurewebsites.net/Api/Usuario"

    // let headers = new HttpHeaders();
    // headers.append('Content-Type', 'application/json');
    // headers.append('enctype', 'multipart/form-data;charset=UTF-16'); 
    // headers.append('Accept-Charset', 'utf-8');
    // headers.append('Access-Control-Allow-Origin', '*');
    // headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');

    // var formData = new FormData();
    // formData.append("comentario", this.comentario);

    // this.http.post( pathURL, formData, { headers: headers } )
    //   .subscribe(res => { alert("success " + res); },
    //     (err) => { alert("failed"); }
    //   );

    // console.log(formData);
    console.log("Comentario"+this.comentario+ " IdPublicacion: "+this.publicacion.id + " IdUsuario: "+ this.usuario.id);
  }
} // cierre DetallePage
