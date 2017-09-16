import {DateTimeHelper} from '../../helpers/dateTimeHelper';
import {Component, ViewChild, ElementRef} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {NavController, AlertController,LoadingController,ActionSheetController,NavParams,ToastController} from 'ionic-angular';
import {Geolocation,Camera, Transfer, File} from 'ionic-native';
import {LogsService} from '../../providers/logs-service';
import {HomePage} from '../home/home';


declare var google;
declare let CordovaExif: any;

// import 'whatwg-fetch';
// cope, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet
@Component({
  templateUrl: 'log-your-moment.html',
  providers: [LogsService]
})

export class LogYourMomentPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  message = '';
  title = '';
  sendLocation = true;
  trip_id: any;
  marker: any;

  image_native_url: string;
  image_safe_url: any;
  dateTime:string;

  // public uploader:FileUploader;
  loader:any;
  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public navParams: NavParams, public logsService: LogsService, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController, public domSanitizer:DomSanitizer) {
    this.trip_id = navParams.get('trip_id');
    this.loader = this.loadingCtrl.create({
      content: "Agregando nuevo registro..."
    });
    this.dateTime = new Date().toISOString();
  }

  loadMap(){
    Geolocation.getCurrentPosition().then((position) => {
      if(this.sendLocation){
        let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        this.setMapPosition(latLng);
        this.map.addListener('click', (e) => {
          this.marker.setPosition(e.latLng);
        });
      }
      }, (err) => {
      console.log(err);
    });  
  }

  setMapPosition(latlng){
    if(this.marker != undefined){
      this.marker.setPosition(latlng);
    }
    else{
      this.marker = new google.maps.Marker({
        position: latlng,
        map: this.map
      });  
    }
    this.marker.setMap(this.map);
    this.map.panTo(latlng);
    console.log(this.marker);
  }

  presentAddPictureActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Agregar una imágen',
      buttons: [
        {
          icon: 'aperture',
          text: 'Tomar una foto',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },{
          icon: 'albums',
          text: 'Cargar desde la librería',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          }
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(pictureSourceType){
    Camera.getPicture({
        destinationType: Camera.DestinationType.NATIVE_URI,
        sourceType: pictureSourceType
    }).then((imageData) => {
      var analizandoImagenLoader = this.loadingCtrl.create({
        content: "Analizando imágen..."
      });
      analizandoImagenLoader.present();
      this.image_safe_url = this.domSanitizer.bypassSecurityTrustUrl(imageData);
      this.image_native_url = imageData;
      CordovaExif.readData(this.image_native_url, (exifObject) => {
        var gpsLatitude = exifObject.GPSLatitude;
        var gpsLongitude = exifObject.GPSLongitude;
        analizandoImagenLoader.dismiss();
        if((gpsLatitude != undefined && gpsLongitude != undefined) || exifObject.DateTimeOriginal != undefined){
          var importandoInformacionLoader = this.loadingCtrl.create({
            content: "Importando información de imágen..."
          });
          importandoInformacionLoader.present();
          if(gpsLatitude != undefined && gpsLongitude != undefined){
            console.log("importando gps lat");
            var lat = this.convertDMSToDD(gpsLatitude[0].numerator / gpsLatitude[0].denominator,
              gpsLatitude[1].numerator / gpsLatitude[1].denominator, 
              gpsLatitude[2].numerator / gpsLatitude[2].denominator, 
              exifObject.GPSLatitudeRef);
              console.log("importando gps lng");
            var lng = this.convertDMSToDD(gpsLongitude[0].numerator / gpsLongitude[0].denominator,
              gpsLongitude[1].numerator / gpsLongitude[1].denominator, 
              gpsLongitude[2].numerator / gpsLongitude[2].denominator, 
              exifObject.GPSLongitudeRef);
            var latlng = new google.maps.LatLng(lat, lng);
            this.setMapPosition(latlng);
          }
          if(exifObject.DateTimeOriginal != undefined){
            console.log("importando horario");
            var dateTimeArray = exifObject.DateTimeOriginal.split(" ");
            var dateArray = dateTimeArray[0].split(":");
            var timeArray = dateTimeArray[1].split(":");
            var date = new Date(dateArray[0], dateArray[1], dateArray[2], timeArray[0], timeArray[1], timeArray[2]);
            this.dateTime = date.toISOString();
          }
          importandoInformacionLoader.dismiss();
        }
      });
    }, (err) => {
      console.log(err);
    });
  }

  showAlert() {
    let alert = this.alertCtrl.create({
        title: 'Success!',
        subTitle: 'Your log message has been sent!',
        buttons: ['OK']
      });
      alert.present();
    }
  submit(){
    this.loader.present();
    var lat = '0';
    var lng = '0';
    var dateTime = DateTimeHelper.getUTCDateFromLocal(new Date(this.dateTime));
    if(this.sendLocation){
      // Geolocation.getCurrentPosition().then((position) => {
        console.log(this.marker);
        lat = this.marker.position.lat().toString().replace('.',',');
        lng = this.marker.position.lng().toString().replace('.',',');
        // console.log();
        // console.log(new Date().toISOString());
        this.logsService.addLog(this.title, this.message, this.sendLocation, lat, lng, dateTime, this.image_native_url, this.trip_id)
        .then((data) => {
          this.loader.dismiss();
          this.presentToast();
          this.navCtrl.setRoot(HomePage);
        });
      // });
    } else{
      this.logsService.addLog(this.title,  this.message, this.sendLocation, lat, lng, dateTime, this.image_native_url, this.trip_id)
      .then((data)=>{
        this.loader.dismiss();
        this.presentToast();
        this.navCtrl.setRoot(HomePage);
      });
    }
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'El registro fue agregado satisfactoriamente.',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
  ionViewDidLoad(){
    this.loadMap();
  }
  convertDMSToDD(degrees, minutes, seconds, direction) {
    var dd = degrees + minutes/60 + seconds/(60*60);
    if (direction == "S" || direction == "W") {
        dd = dd * -1;
    } // Don't do anything for N or E
    return dd;
  }
}
