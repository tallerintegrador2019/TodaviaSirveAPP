import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { PublicacionProvider } from '../../providers/publicacion/publicacion';
import { Publicacion } from '../models/publicacion.model';
import { PasosPage } from '../pasos/pasos';


@IonicPage()
@Component({
  selector: 'page-publicar',
  templateUrl: 'publicar.html',
})
export class PublicarPage {

  img
  publicacion: Publicacion = <Publicacion>{};

  id:string =""

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
    this.publicacionProvider.subirPublicacion(this.publicacion)
      .map(res => JSON.stringify(res))
      .subscribe(
        res => { 
          this.id = res; // no lo guarda LPM
          console.log("resultado de res: ", res) ;
      })
      console.log("resultado de id: ", this.id)

/*     this.navCtrl.push(PasosPage, {"Publi": this.publicacion}); */
  }

    cargaArchivo(event) {
      this.publicacion.imagenPortada = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (event:any) => {
         this.img = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

} // cierre clase
