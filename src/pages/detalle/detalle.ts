import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { YtProvider } from "../../providers/yt/yt";
import { PasoProvider } from '../../providers/paso/paso';
import {UsuarioProvider} from "../../providers/usuario/usuario";
import {PublicacionProvider} from "../../providers/publicacion/publicacion";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ComenUsu } from '../models/comenUsu.model';
import { ComentarioCantidad } from '../models/ComentarioCantidad.model';


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
  comentarioCantidad
  listadoComentarios
  valor2 : ComentarioCantidad
  pasos

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public ytProvider: YtProvider,
    public pasoProvider: PasoProvider,
    public http: HttpClient,
    public usuarioProv : UsuarioProvider,
    public publicacionProvider : PublicacionProvider
  ) {

    this.publicacion = navParams.get("publi");
    this.pasoProvider.getPasosDePublicacion(this.publicacion.id)
      .subscribe(res => this.pasos = res)
      this.publicacionProvider.obtenerComentarioPublicacion(this.publicacion.id)
      .subscribe(res => this.comentarioCantidad = res);
     
      this.valor2 = this.comentarioCantidad
      console.log(this.comentarioCantidad);
      console.log(this.comentarioCantidad);

    //this.comentarioCantidad = this.listadoComentarios.cantidad;
    //this.listadoComentarios = this.listadoComentarios.comentarioUsuarios;
    // API PARA TRAER LOS VIDEOS DE YOUTUBE
    /* this.ytProvider.obtenerVideos(this.publicacion.titulo).subscribe(res => this.videosEncontrados = res['items']); */
    this.usuario = this.usuarioProv.obtenerUsuarioLogueado();
    console.log(this.videosEncontrados);
  }

  ionViewDidLoad() {  }

  cargarPublicacion(){
    if(this.valor == null){
       this.valor = "Cargado";
       console.log(this.valor);
    this.signupform = new FormGroup({
      comentario: new FormControl('', [Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)])
    });
    // this.publicacionProvider.obtenerComentarioPublicacion(this.publicacion.id)
    // .subscribe(res => this.listadoComentarios = res);
    console.log(this.listadoComentarios);
    }else{
      this.valor = null
    }
    
  }

  submitComentario(){
     let pathURL = "http://localhost:55081/Api/Publicacion/subirComentario"
    // let pathURL = "http://todaviasirve.azurewebsites.net/Api/Usuario"

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('enctype', 'multipart/form-data;charset=UTF-16'); 
    headers.append('Accept-Charset', 'utf-8');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');

    var formData = new FormData();
    formData.append("comentario", this.comentario);
    formData.append("idUsuario", this.usuario.id);
    formData.append("idPublicacion", this.publicacion.id);

    this.http.post( pathURL, formData, { headers: headers } )
      .subscribe(res => { alert("success " + res); },
        (err) => { alert("failed"); }
      );

    console.log(formData);
    console.log("Comentario"+this.comentario+ " IdPublicacion: "+this.publicacion.id + " IdUsuario: "+ this.usuario.id);
  }
} // cierre DetallePage
