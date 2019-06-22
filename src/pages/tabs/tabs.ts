import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { BuscarPage } from '../buscar/buscar';
import { RegistrarPage } from '../registrar/registrar';
import { PerfilPage } from '../perfil/perfil';


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1 = HomePage;
  tab2 = BuscarPage;
  tab3 = PerfilPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

}
