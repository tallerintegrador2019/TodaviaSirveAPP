import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { PublicacionProvider } from '../../providers/publicacion/publicacion';
import { Publicacion } from '../models/publicacion.model';
import { PasosPage } from '../pasos/pasos';
import {UsuarioProvider} from '../../providers/usuario/usuario';
import { Usuario } from '../models/usuario.model';

@IonicPage()
@Component({
  selector: 'page-publicar',
  templateUrl: 'publicar.html',
})
export class PublicarPage {
  usuario: Usuario;
  img
  publicacion: Publicacion = <Publicacion>{};
  publi
  fechaHoy: String = new Date().toISOString();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public publicacionProvider: PublicacionProvider,
    public usuarioProvider:UsuarioProvider
  ) {
      this.usuario = usuarioProvider.obtenerUsuarioLogueado();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicarPage');
  }

  /*   submitPublicacion() {
      console.log(this.publicacion);
      this.publicacion.fechaSubida = this.fechaHoy;
      this.publicacionProvider.subirPublicacion(this.publicacion)
        .subscribe(
          res => {
            console.log("resultado de res: ", this.publi = res);
          });
  
          console.log(this.publi)
  
      this.navCtrl.push(PasosPage, { "Publi": this.publicacion });
    } */

  submitPublicacion() {
    console.log(this.publicacion);
    this.publicacion.fechaSubida = this.fechaHoy;
    this.publicacionProvider.subirPublicacion(this.publicacion,this.usuario.id)
      .subscribe(res => {
        localStorage.setItem("idP", res["id"]+1);
      })

      this.navCtrl.push(PasosPage, { "idPubli": localStorage.getItem("idP") });

  }



  cargaArchivo(event) {
    this.publicacion.imagenPortada = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.img = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

} // cierre clase
