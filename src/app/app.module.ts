import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { DetallePageModule } from "../pages/detalle/detalle.module";
import { BuscarPageModule } from "../pages/buscar/buscar.module";
import { AboutPageModule } from "../pages/about/about.module";
import { RegistrarPageModule } from "../pages/registrar/registrar.module";
import { TabsPageModule } from "../pages/tabs/tabs.module";
import { PerfilPageModule } from '../pages/perfil/perfil.module';
import { LoginPageModule } from '../pages/login/login.module';
import { EditarusuarioPageModule } from '../pages/editarusuario/editarusuario.module';
import { PublicarPageModule } from '../pages/publicar/publicar.module';

import { HttpClientModule, HttpHeaderResponse } from "@angular/common/http";

import { YtProvider } from '../providers/yt/yt';
import { PublicacionProvider } from '../providers/publicacion/publicacion';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { LoginProvider } from '../providers/login/login';

import { AvatarUserComponent } from "../components/avatar-user/avatar-user";
import { PasosPageModule } from '../pages/pasos/pasos.module';
import { ReconoProvider } from '../providers/recono/recono';

import { Camera } from '@ionic-native/camera';
import { CamaraPageModule } from '../pages/camara/camara.module';
import { AngularFireStorageModule } from "angularfire2/storage";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { AngularFireModule } from '@angular/fire';
import { FIREBASE_CONFIG } from "../app/firebase.config";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    AvatarUserComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    DetallePageModule,
    BuscarPageModule,
    AboutPageModule,
    RegistrarPageModule,
    TabsPageModule,
    PerfilPageModule,
    LoginPageModule,
    EditarusuarioPageModule,
    PublicarPageModule,
    PasosPageModule,
    CamaraPageModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PublicacionProvider,
    YtProvider,
    UsuarioProvider,
    LoginProvider,
    ReconoProvider,
    Camera
  ]
})
export class AppModule {}
