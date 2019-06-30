import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReconocimientoPage } from './reconocimiento';
import { AngularFireModule } from 'angularfire2';
import { environment } from "../../environment";

@NgModule({
  declarations: [
    ReconocimientoPage,
  ],
  imports: [
    IonicPageModule.forChild(ReconocimientoPage),
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
})
export class ReconocimientoPageModule {}
