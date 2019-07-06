import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Usuario } from '../models/usuario.model';
import { PerfilPage } from '../perfil/perfil';
import { TabsPage } from '../tabs/tabs';


@IonicPage()
@Component({
  selector: 'page-editarusuario',
  templateUrl: 'editarusuario.html',
})
export class EditarusuarioPage implements OnInit {

  usuario: Usuario;
  signupform: FormGroup;
  img

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public http: HttpClient,
    public usuarioProvider: UsuarioProvider
  ) {

    this.usuario = this.usuarioProvider.obtenerUsuarioLogueado();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarusuarioPage');
  }

  ngOnInit(): void {

    // validaciones
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signupform = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
      apellido: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(30)]),
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      username: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(4), Validators.maxLength(12)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(12)])
    });
  }


  editarUsuario() {
    this.usuarioProvider.editarUsuario(this.usuario.id, this.usuario)
    /* localStorage.setItem('currentUser', JSON.stringify(this.usuario)); */
    this.usuarioProvider.setearUsuarioLogueado(this.usuario);
    this.navCtrl.setRoot(PerfilPage);
    console.log(this.usuario);

  } // cierre editarUsuario()


  onFileChanged(event) {
    this.usuario.imagen = event.target.files[0];
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.img = event.target.result;
    }
    reader.readAsDataURL(event.target.files[0]);
  }



} // cierre clase
