import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Config } from 'ionic-angular';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {storage,initializeApp } from 'firebase';
import { AngularFireStorage, AngularFireUploadTask } from "angularfire2/storage";
 import { LoadingController } from 'ionic-angular';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { FIREBASE_CONFIG } from "../../app/firebase.config";
//import {AngularFireStorage} from '@angular/fire/storage';
//import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
//import { AngularFireStorage } from "angularfire2/storage";
import { Observable } from "rxjs";
import { finalize } from 'rxjs/operators';
import { analyzeNgModules } from '@angular/compiler';
import { JsonPipe } from '@angular/common';
import { JsonpCallbackContext } from '@angular/common/http/src/jsonp';
import { stringify } from '@angular/core/src/util';

@IonicPage()
@Component({
  selector: 'page-camara',
  templateUrl: 'camara.html',
})
export class CamaraPage {

   // propiedades de storage
   uploadPercent: Observable<number>;
   downloadURL: Observable<string>;
   image2: string = null;
   
  //  imageStorage: string = null;
  acaUrl
 // downloadURL;
  responseFirebase;
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
              public toast : ToastController,
              private storage1: AngularFireStorage
            ){
              
                //initializeApp(FIREBASE_CONFIG);
             }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CamaraPage');
  }

      
  //  DESDE LA CAMARA DEL CELULAR ----------------
async getPictureCam() 
{
        const options: CameraOptions = {
          quality: 60,
          targetHeight: 600,
          targetWidth: 600,
          destinationType: this.camera.DestinationType.DATA_URL,
          encodingType: this.camera.EncodingType.JPEG,
          mediaType: this.camera.MediaType.PICTURE,
          //saveToPhotoAlbum: true
        } 
    
        
        try{

          const resultado = await this.camera.getPicture(options); 
          //this.image  =  'data:image/jpeg;base64,' + resultado;
          const imagen = `data:image/jpeg;base64,${resultado}`;
          this.image = imagen;
          const pictures = storage().ref('pictures/mifoto');
                          
         // const task = 
          const task1 =  pictures.putString(imagen, 'data_url').then(res => {
            //this.acaUrl  = res.downloadURL;
            //this.mostrarToast ("deberia url"+this.acaUrl,7000);
            // otroalgo.downloadURL();
          });

         // var algo: Promise<AngularFireUploadTask> ;
          // algo = pictures.getDownloadURL();


          // var otro = pictures.getDownloadURL().then(function(url){
          //            this.mostrarToast("esto es una url creo"+url,5000);
          // });

          pictures.getDownloadURL().then(res => {
            this.acaUrl = res;
            this.mostrarToast("url"+this.acaUrl, 6000);
            this.mostrarToast(res,8000);
            this.subirApiJson(res);
          })

      

                   //Con firestore

          // var archivoEnviar;
          // let file1 = fetch(imagen).then(r => r.blob()).then(blob => {
          //   const file = new File([blob], "Imagencita")
          //   this.mostrarToast("Ya sali del new file",8000);
          //   archivoEnviar = file;
          //   const ref = this.storage1.ref("angularfire/reconocimiento");
          //   const task = this.storage1.upload("angularfire/reconocimiento",file);
          // task.snapshotChanges().pipe(
          //   finalize(() => {
          //       this.downloadURL = ref.getDownloadURL();
          //       this.downloadURL.subscribe( url => {
          //           this.image2 = url;
          //           this.mostrarToast("Esta es mi url "+ this.image2 , 6000);
          //       })
          //   })
          // ).subscribe();
          // });
          // this.mostrarToast("ya pase el snapshot",5000);
          // archivoEnviar = file1;
          
          

                  
          // .then(() =>{
          //     this.acaUrl = pictures.getDownloadURL().then(function(url){
          //       this.mostrarToast(url,6000);
          //     });
          // });

          // Decimos que se puede hacer suscribe solamente a tipo Observable
          
          
          //const downloadURL = pictures.getDownloadURL();
          
          // pictures.getDownloadURL().then(function( url){
          //   this.mostrarToast(url,6000);
          // });
          
          //const task: AngularFireUploadTask = this.afStorage.upload("pictures/miFoto", resultado);

          //this.downloadURL = task.downloadURL();
            // task.then(res => this.downloadURL = res);
            
            //this.downloadURL.subscribe((url) => {

            //   this.acaUrl = url;
            //   // do something 
            //   // this.loading.dismiss();

            // });


          //               // otra forma
          // const task = this.storage1.upload("format/", this.image);
          // const ref = this.storage1.ref("format/");

          // // observar porcentaje cambiados
          // this.uploadPercent = task.percentageChanges();
          // //console.log('Imagen subida!');

          // task.snapshotChanges().pipe(
          //   finalize(() => {
          //     this.downloadURL = ref.getDownloadURL()
          //     //this.mostrarToast(this.downloadURL,7000);
          //     this.downloadURL.subscribe(url => (
          //       this.imageStorage = url
          //       //mostrarToast(this.image,7000);
          //       //this.mostrarToast(this.downloadURL,7000);
          //       ));
          //   })
          // ).subscribe();
        // this.camera.getPicture(options).then((imageData) => {
        //       //    // imageData is either a base64 encoded string or a file URI
        //       //    //this.uploadPhoto(imageData);
        //       this.image = 'data:image/jpeg;base64,' + imageData;
        //       const pictures = storage().ref('pictures');
        //       pictures.putString(imageData, 'DATA_URL');
        //       //   // this.mostrarToast(this.image, 15000);
        //       //    //this.elemento =  document.getElementById("ImagenInput");
        //       this.mostrarToast(pictures.name, 10000);

                     
         } catch (error) {
           this.mostrarToast("Fallo fuera del Get"+error.message, 5000);
        }
} 
subirApiJson(res) {

  this.loading = this.loadingCtrl.create({ content: "Espere por favor..."});
  this.loading.present();

  let pathURL = "https://brazilsouth.api.cognitive.microsoft.com/vision/v1.0/analyze?language=es&visualFeatures=tags"
  let apiKey = "a84d243e248d4e67aee85fce8cace729";
  
  const headers = new HttpHeaders()
    .set('Ocp-Apim-Subscription-Key', apiKey)
    .set('Content-Type', 'application/json;charset=UTF-8')
    .set('Access-Control-Allow-Origin', '*')
    .set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT')


   
    var jsonString = JSON.stringify({url: res});
    // var obj;
    // obj = {

    // }
    // const formData = new FormData();
  // formData.append("image",this.elemento);
  this.http.post(pathURL, jsonString, { headers: headers })
    .subscribe(res => {
      this.encontrado = res['tags']
      this.mostrarToast("Sin errores", 6000);
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
      this.mostrarToast(err.status+" error code: "+err.code +"  Mensaje"+err.message, 6000);
      this.encontrado = this.datos;
      // this.encontrado = ["no se encontraron resultados","Sin resultados"];
    });

}


b64DecodeUnicode(str) 
{
      // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
}


      
         //Convertir datos a binario
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

  
      // Subir foto de la camara como tipo Blob o File
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

        // Resolver url local

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

          //Resolver Url local
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
            
      }

        //Crear un File 
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
     let reader = new FileReader();
     reader.onload = (event: any) => {
       this.image = event.target.result;
     }
       reader.readAsDataURL(event.target.files[0]);
     this.subirAAPI();
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
