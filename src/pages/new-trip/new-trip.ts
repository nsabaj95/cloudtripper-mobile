import {Component} from '@angular/core';
import {NavController, AlertController,LoadingController,ActionSheetController,NavParams,ToastController} from 'ionic-angular';
import {Camera} from 'ionic-native';
import {TripsService} from '../../providers/trips-service';
import {UsersService} from '../../providers/users-service';
import {HomePage} from '../home/home';

// import 'whatwg-fetch';
// cope, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet
@Component({
  templateUrl: 'new-trip.html',
  providers: [TripsService,UsersService]
})

export class NewTripPage {
  origin='';
  destination='';
  startDate='';
  endDate='';
  user_id:any;
  public base64Image: string;
  // public uploader:FileUploader;
  loader:any;
  constructor(public navCtrl: NavController,public usersService: UsersService, public tripsService: TripsService, public toastCtrl: ToastController, public navParams: NavParams, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public actionSheetCtrl: ActionSheetController) {
    this.user_id = UsersService.currentUser.id;
    this.loader = this.loadingCtrl.create({
      content: "Adding new trip..."
    });
  }

  presentAddPictureActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Add a picture',
      buttons: [
        {
          icon: 'aperture',
          text: 'Take a picture',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.CAMERA);
          }
        },{
          icon: 'albums',
          text: 'Upload from library',
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
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: pictureSourceType,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
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
    this.tripsService.addTrip(this.origin,this.destination,this.startDate,this.endDate,this.user_id,this.base64Image)
    .then((data) => {
      this.loader.dismiss();
      this.presentToast();
      this.navCtrl.setRoot(HomePage);
    });
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Trip was added successfully',
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
  ionViewDidLoad(){
    
  }
}
