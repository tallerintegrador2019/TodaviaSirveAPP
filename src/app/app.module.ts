import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { DetallePageModule } from "../pages/detalle/detalle.module";
import { BuscarPageModule } from "../pages/buscar/buscar.module";
import { AboutPageModule } from "../pages/about/about.module";
import { RegistrarPageModule } from "../pages/registrar/registrar.module";
import { TabsPageModule } from "../pages/tabs/tabs.module";
import { PerfilPageModule } from '../pages/perfil/perfil.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { PublicacionProvider } from '../providers/publicacion/publicacion';
import { HttpClientModule, HttpHeaderResponse } from "@angular/common/http";
import { YtProvider } from '../providers/yt/yt';

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { LoginPageModule } from '../pages/login/login.module';
import {PublicacionPageModule} from '../pages/publicacion/publicacion.module';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { LoginProvider } from '../providers/login/login';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
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
    PublicacionPageModule
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
    FileTransfer,
    FileTransferObject,
    File,
    Camera,
    UsuarioProvider,
    LoginProvider
  ]
})
export class AppModule {}
