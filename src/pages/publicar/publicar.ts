import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { PublicacionProvider } from '../../providers/publicacion/publicacion';
import { Publicacion } from '../models/publicacion.model';


@IonicPage()
@Component({
  selector: 'page-publicar',
  templateUrl: 'publicar.html',
})
export class PublicarPage {

  publicacion: Publicacion = <Publicacion>{};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public publicacionProvider: PublicacionProvider
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PublicarPage');
  }

  submitPublicacion() {
    console.log(this.publicacion);
    this.publicacionProvider.subirPublicacion(this.publicacion);

  }

    cargaArchivo(event) {
      this.publicacion.imagenPortada = event.target.files[0];
    }

} // cierre clase
