import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { PublicacionProvider } from '../../providers/publicacion/publicacion';
import { Publicacion } from '../models/publicacion.model';
import { PasosPage } from '../pasos/pasos';
import { JsonPipe } from '@angular/common';
import { stringify } from '@angular/core/src/util';


@IonicPage()
@Component({
  selector: 'page-publicar',
  templateUrl: 'publicar.html',
})
export class PublicarPage {

  img
  publicacion: Publicacion = <Publicacion>{};
  publi
  fechaHoy: String = new Date().toISOString();

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public publicacionProvider: PublicacionProvider
  ) {

  }

  ionViewDidLoad() {  }


  submitPublicacion() {
    this.publicacion.fechaSubida = this.fechaHoy;
    this.publicacionProvider.subirPublicacion(this.publicacion)
      .subscribe(res => {
        localStorage.removeItem("idP");
        localStorage.setItem("idP", res["id"] + 1);
      });

    console.log("Objeto Publicacion subido: ", this.publicacion);
    console.log("Este es el ID recibido del post: ", localStorage.getItem("idP"))

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
