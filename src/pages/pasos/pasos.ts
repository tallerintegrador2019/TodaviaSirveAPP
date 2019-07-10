import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { PublicacionProvider } from "../../providers/publicacion/publicacion";
import { Paso } from '../models/paso.model';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-pasos',
  templateUrl: 'pasos.html',
})
export class PasosPage {

  img
  paso: Paso = <Paso>{};
  idPublicacion// id traido de publicacion
  pasoNro: number;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public publicacionProvider: PublicacionProvider
  ) {

    this.idPublicacion = navParams.get("idPubli");

  }

  ionViewDidLoad() {  }


  submitPaso() {
    this.publicacionProvider.subirPaso(this.paso, this.idPublicacion);
    this.navCtrl.push(PasosPage, { "idPubli": this.idPublicacion })
  }

  cargaArchivo(event) {
    this.paso.imagen = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.img = event.target.result;
    }
    if (this.paso.imagen) {
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  

  irAHome(){
    this.publicacionProvider.subirPaso(this.paso, this.idPublicacion);
    this.navCtrl.setRoot(TabsPage);
  }

} // cierre clase
