import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { BuscarPage } from '../pages/buscar/buscar';
import { AboutPage } from "../pages/about/about";
import { RegistrarPage } from "../pages/registrar/registrar";
import { TabsPage } from '../pages/tabs/tabs';
import { PerfilPage } from '../pages/perfil/perfil';
import { LoginPage } from '../pages/login/login';
import { PublicarPage } from '../pages/publicar/publicar';
import { ReconocimientoPage } from '../pages/reconocimiento/reconocimiento';
import { CamaraPage } from '../pages/camara/camara';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

  usuario = localStorage.getItem('currentUser');

  rootPage: any;

  pages: Array<{title: string, component: any, icon: string}>;

  constructor(  public platform: Platform, 
                public statusBar: StatusBar, 
                public splashScreen: SplashScreen,
              ) {
    this.initializeApp();

    // si hay usuario va al Home sino va al Login
    if (this.usuario) {
      this.rootPage = HomePage;
    } else{
      this.rootPage = LoginPage;
    }

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: TabsPage, icon: 'home' },
      { title: 'Buscador', component: BuscarPage, icon: 'search' },
      { title: 'Mi Perfil', component: PerfilPage, icon: 'person' },
      { title: 'Quienes somos', component: AboutPage, icon: 'thumbs-up' },
      { title: 'Publicar', component: PublicarPage, icon: 'person' },
      { title: 'Reconocimiento', component: ReconocimientoPage, icon: 'search' },
      { title: 'Camara', component: CamaraPage, icon: 'camera' }
      /* { title: 'List', component: ListPage } */
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){
    localStorage.clear(); //becausae i have information from user
    this.nav.push(LoginPage);
  }

}
