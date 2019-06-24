import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';




@Injectable()
export class LoginProvider {

  constructor(public http: HttpClient) {
    console.log('Hello LoginProvider Provider');
  }

  estaRegistrado(email: string, pass: string){
    return this.http.get("http://localhost:55081/api/Usuario/estaRegistrado/"+email+"/"+pass);
  }


}
