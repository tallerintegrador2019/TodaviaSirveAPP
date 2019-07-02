import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReconoProvider } from '../../providers/recono/recono';


@IonicPage()
@Component({
  selector: 'page-reconocimiento',
  templateUrl: 'reconocimiento.html',
})
export class ReconocimientoPage {

  img

  tags

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public reconoProvider: ReconoProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReconocimientoPage');
  }

  submitReconocer(){
  this.reconoProvider.reconoImagen(this.img)
      .subscribe(data => this.tags = data);
  }

  cargaArchivo(event) {
    this.img = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event:any) => {
       this.img = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }

}
