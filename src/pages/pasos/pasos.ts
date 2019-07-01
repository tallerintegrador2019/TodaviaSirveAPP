import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PublicacionProvider } from "../../providers/publicacion/publicacion";
import { Paso } from '../models/paso.model';

@IonicPage()
@Component({
  selector: 'page-pasos',
  templateUrl: 'pasos.html',
})
export class PasosPage {

  img
  paso: Paso = <Paso>{};

  publi// id traido de publicacion

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public publicacionProvider: PublicacionProvider
    ) {
      this.publi = navParams.get("Publi");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasosPage');
  }


  submitPaso() {
    console.log(this.paso);
    console.log(this.publi)
    this.navCtrl.push(PasosPage,{ "Publi": this.publi } )

  /*   this.publicacionProvider.subirPaso(this.paso); */

  }

    cargaArchivo(event) {
      this.paso.imagen = event.target.files[0];
      let reader = new FileReader();
      reader.onload = (event:any) => {
         this.img = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }

}
