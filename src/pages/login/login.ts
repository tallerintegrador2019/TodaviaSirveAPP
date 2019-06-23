import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';



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

}
