import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { LoginProvider } from "../../providers/login/login";
import { HttpErrorResponse, HttpClient, HttpResponse, HttpHeaderResponse } from '@angular/common/http';
import { TabsPage } from '../tabs/tabs';

import { UsuarioProvider } from "../../providers/usuario/usuario";
import { Usuario } from '../models/usuario.model';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements OnInit {


  signupform: FormGroup;
  userData = { "email": "", "password": "" };

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public loginProvider: LoginProvider,
    public toastCtrl: ToastController,
    public usuarioProvider: UsuarioProvider
  ) {

  }

  ngOnInit(): void {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signupform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
    });
  }

  ionViewDidLoad() {

  }

  loguearUsuario() {

    var usuario = this.loginProvider.estaRegistrado(this.userData.email, this.userData.password).map(data => <Usuario>data);

    usuario.subscribe(res => {
      console.log(res);
      
      this.usuarioProvider.setearUsuarioLogueado(res);

      this.presentToast("BIENVENIDO: " + this.userData.email );
    },
      error => {
        console.error(error);
        this.presentToast("USUARIO INCORRECTO");
      },
      () => this.navCtrl.push(TabsPage)
    );


  } // cierre metodo


  presentToast(msj: string) {
    const toast = this.toastCtrl.create({
      message: msj,
      duration: 3000,
    });

    toast.present();
  }



} // cierre clase
