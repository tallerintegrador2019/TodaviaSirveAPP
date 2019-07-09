import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Config } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {storage,initializeApp} from 'firebase';
 import { LoadingController } from 'ionic-angular';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { FIREBASE_CONFIG } from "../../app/firebase.config";

@IonicPage()
@Component({
  selector: 'page-camara',
  templateUrl: 'camara.html',
})
export class CamaraPage {

  elemento;
  image: string = null;
  imagenblob;
  myPhoto;
  public error: string;
  BASE64_MARKER = ';base64,';
  loading
  //formData = new FormData();
  encontrado
  datos = ["aaaaa", "bbbbbb", "cccccc", "ddddddd", "eeeeee", "ffffff"]

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private camera: Camera,
    private http: HttpClient,
    public loadingCtrl: LoadingController,
    public toast : ToastController
  ) {
    initializeApp(FIREBASE_CONFIG);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CamaraPage');
  }

      
  //  DESDE LA CAMARA DEL CELULAR ----------------
      async getPictureCam() {
    
        const options: CameraOptions = {
          quality: 60,
          targetHeight: 49,
          targetWidth: 49,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.PNG,
          mediaType: this.camera.MediaType.PICTURE
        } 
    
  
          // const resultado = await this.camera.getPicture(options); 
          // const imagen = `data:image/jpeg;base64,${resultado}`;
        

        try{

         this.camera.getPicture(options).then((imageData) => {
              //    // imageData is either a base64 encoded string or a file URI
              //    // If it's base64 (DATA_URL):
              //    //this.uploadPhoto(imageData);
                
              //   //this.image = imageData;
              //   // this.mostrarToast(this.image, 15000);
              //    //this.elemento =  document.getElementById("ImagenInput");
              //    //this.mostrarToast(this.elemento, 10000);

              //    //this.mostrarToast(this.myPhoto.name, 20000);
              //let decode = this.b64DecodeUnicode(imageData);
              //this.myPhoto = this.convertDataURIToBinary(imageData);
              this.image = 'data:image/jpeg;base64,' + imageData;
              let file1 = fetch(this.image).then(r => r.blob());
              //.then(fil => new File([fil],"imagen.jpg"));
                  this.elemento = file1;
              this.submitFoto();
              //this.subirAPICamara();
              
              //this.image = 'data:image/JPEG;base64,' + imageData;
                        
              // const pictures = storage().ref('pictures/reconocimiento');
              // pictures.putString(this.image, 'DATA_URL');

              // this.uploadPhoto(imageData);  

            
              
                }, (err) => {
                  this.mostrarToast("Fallo en Get Picture", 5000);
                });
              //   //const imagen = `data:image/jpeg;base64,${resultado}`;
              //   const pictures = storage().ref('pictures/reconocimiento');
              //   //this.image = resultado;
              //   pictures.putString(this.image, 'DATA_URL');
        
         } catch (error) {
           this.mostrarToast("Fallo fuera del Get", 5000);
        }
     } 

     b64DecodeUnicode(str) {
      // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
      }

     submitFoto() {
      //let pathURL = "http://localhost:55081/Api/Usuario/PostUsuario" 
      let pathURL = "http://todaviasirve.azurewebsites.net/Api/Usuario/PostUsuario"
  
      let headers = new HttpHeaders();
      //headers.append('Content-Type', 'application/json');
      headers.append('enctype', 'multipart/form-data;charset=UTF-16'); 
      headers.append('Accept-Charset', 'utf-8');
      headers.append('Access-Control-Allow-Origin', '*');
      headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  
      var formData = new FormData();
      formData.append("nombre","usuarioImagen");
      formData.append("imagen", this.elemento);
  
      this.http.post( pathURL, formData, { headers: headers } )
        .subscribe(res => { alert("success " + res); },
          (err) => { alert("failed"+ err.message); }
        );
    }

      

      convertDataURIToBinary(dataURI) {
        // var base64Index = dataURI.indexOf(this.BASE64_MARKER) + this.BASE64_MARKER.length;
        // var base64 = dataURI.substring(base64Index);
        var raw = window.atob(dataURI);
        var rawLength = raw.length;
        var array = new Uint8Array(new ArrayBuffer(rawLength));
        this.mostrarToast("entre al convert antes del for", 5000);
        for(let i = 0; i < rawLength; i++) {
          array[i] = raw.charCodeAt(i);
        }
        this.mostrarToast("entre al convert despues del for", 5000);

        return array;
    }

  

      subirAPICamara() {

        this.loading = this.loadingCtrl.create({ content: this.myPhoto});
        this.loading.present();
    
        let pathURL = "https://brazilsouth.api.cognitive.microsoft.com/vision/v1.0/analyze?language=es&visualFeatures=tags"
        let apiKey = "a84d243e248d4e67aee85fce8cace729";
    
        const headers = new HttpHeaders()
          .set('Ocp-Apim-Subscription-Key', apiKey)
          .set('enctype', 'multipart/form-data;charset=UTF-8')
          .set('Access-Control-Allow-Origin', '*')
          .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')
    
        const formData = new FormData();
        formData.append("image",this.elemento);
        this.http.post(pathURL, formData, { headers: headers })
          .subscribe(res => {
            this.encontrado = res['tags']
            this.mostrarToast("Sin errores", 6000);
          }, (err) => {
            this.loading.dismiss();
            this.mostrarToast(err.status+" error code: "+err.code +"  Mensaje"+err.message, 6000);
            this.encontrado = this.datos;
    
            // this.encontrado = ["no se encontraron resultados","Sin resultados"];
          });
    
      }

  //     getFileEntry(imgUri) {
  //       window.resolveLocalFileSystemURL(imgUri, function success(fileEntry) {
    
  //           // Do something with the FileEntry object, like write to it, upload it, etc.
  //           // writeFile(fileEntry, imgUri);
  //           console.log("got file: " + fileEntry.fullPath);
  //           // displayFileData(fileEntry.nativeURL, "Native URL");
    
  //       }, function () {
  //         // If don't get the FileEntry (which may happen when testing
  //         // on some emulators), copy to a new FileEntry.
  //          this.createNewFileEntry(imgUri);
  //       });
  //   }

  //   createNewFileEntry(imgUri) {
  //     window.resolveLocalFileSystemURL(cordova.file.cacheDirectory, function success(dirEntry) {
        
  //         // JPEG file
  //         dirEntry.getFile("tempFile.jpeg", { create: true, exclusive: false }, function (fileEntry) {
  
  //             // Do something with it, like write to it, upload it, etc.
  //             // writeFile(fileEntry, imgUri);
  //             console.log("got file: " + fileEntry.fullPath);
  //             // displayFileData(fileEntry.fullPath, "File copied to");
  
  //         }, onErrorCreateFile);
  
  //     }, onErrorResolveUrl);
  // }

      private async uploadPhoto(imageFileUri: string) {
        this.error = null;
        this.loading = await this.loadingCtrl.create({
          content: imageFileUri
        });
    
        this.loading.present();
        
        let file1 = fetch(imageFileUri).then(r => r.blob())
         .then(blobFile => new File([blobFile], "fileNameGoesHere"));

          this.myPhoto = file1.toString();
          this.loading.dismiss();
          this.subirAPICamara();
            

        // this.mostrarToast(file1.name,4000);
        // window['resolveLocalFileSystemURL'](imageFileUri,
        //   entry => {
        //     entry['file'](file => {
        //       this.loading.dismiss();
        //       this.myPhoto = file;
                //       this.subirAPICamara();
             
        //       this.readFile(file)
        //     });
        //     this.loading.dismiss();
        //   }, err => {
        //     this.loading.dismiss();
        //     this.mostrarToast("Fallo en el read file", 5000);
        //   });
      }

      
  private readFile(file: any) {
    this.mostrarToast("entre al readfile", 5000);
    const reader = new FileReader();
    //this.myPhoto = file;
    reader.onloadend = () => {
      //const formData = new FormData();
      const imgBlob = new Blob([reader.result], {type: file.type});
      //this.myPhoto = imgBlob;
      //this.myPhoto =new File([imgBlob],"Foto");
      //formData.append("image", imgBlob);
    };
    
    //reader.readAsDataURL(file);
    //this.subirAPICamara(); 
  }

 

  // DESDE ARCHIVO ----------------------
  getPicture(event) {
    this.image = event.target.files[0];
    this.elemento = this.image;
    this.submitFoto();
    // this.myPhoto = event.target.files[0];
    // //this.image = 'data:image/JPEG;base64,' + imageData;
    //  this.mostrarToast(this.image, 15000);
    //  console.log(this.image.toString);
    // let reader = new FileReader();
    // reader.onload = (event: any) => {
    //   this.image = event.target.result;
    // }
    //   reader.readAsDataURL(event.target.files[0]);

    // this.subirAAPI();
  }  

  subirAAPI() {

    this.loading = this.loadingCtrl.create({ content: " espere por favor..."});
    this.loading.present();

    let pathURL = "https://brazilsouth.api.cognitive.microsoft.com/vision/v1.0/analyze?language=es&visualFeatures=tags"
    let apiKey = "a84d243e248d4e67aee85fce8cace729";

    const headers = new HttpHeaders()
      .set('Ocp-Apim-Subscription-Key', apiKey)
      .set('enctype', 'multipart/form-data;charset=UTF-8')
      .set('Access-Control-Allow-Origin', '*')
      .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')

      this.mostrarToast(this.image, 9000);

    const formData = new FormData();
    formData.append("image",this.image);
    this.http.post(pathURL, formData, { headers: headers })
      .subscribe(res => {
        this.loading.dismiss();
        this.encontrado = res['tags']
        this.mostrarToast("Sin errores", 10000);
      }, (err) => {
        this.loading.dismiss();
        this.mostrarToast(err, 10000);
        this.encontrado = this.datos;
      });

  }

   //Funcion para mostrar mensaje de error recibe mensaje de error y la duración de el mensaje
   mostrarToast(mensaje: string, duracion: number) {
    this.toast.create({
      message: mensaje,
      duration: duracion
    }).present();
  }

} // cierre clase
