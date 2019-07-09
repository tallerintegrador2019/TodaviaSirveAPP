import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Paso } from '../models/paso.model';
import { PasoProvider } from '../../providers/paso/paso';
import { PasosdepublicacionesPage } from '../pasosdepublicaciones/pasosdepublicaciones';


@IonicPage()
@Component({
  selector: 'page-editarpaso',
  templateUrl: 'editarpaso.html',
})
export class EditarpasoPage {

  paso: Paso;
  img
  imagesPath = "https://todaviasirve.azurewebsites.net/Content/Images/"
  /* imagesPath = "http://localhost:55081/Content/Images/" */

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pasoProvider: PasoProvider,
    ) {

      this.paso = navParams.get("paso");
  }

  ionViewDidLoad() {

  }

  onFileChanged(event) {
    this.paso.imagen = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.img = event.target.result;
    }
    if (this.paso.imagen){
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  editarPaso(){
    this.pasoProvider.editarPaso(this.paso);
    console.log("el id del paso es: " + this.paso.id)
    this.navCtrl.popTo(PasosdepublicacionesPage);
  }



} // cierre clase
