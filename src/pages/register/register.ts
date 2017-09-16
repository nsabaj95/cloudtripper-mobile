import { Component } from '@angular/core';
import { NavController,LoadingController, AlertController, Platform, ActionSheetController,ToastController } from 'ionic-angular';
import {UsersService} from '../../providers/users-service';
import {LoginPage} from '../login/login';
import { Camera } from 'ionic-native';

@Component({
  templateUrl: 'register.html',
  providers: [UsersService]
})
export class RegisterPage {
  loader:any;
  username;
  password;
  text;
  avatar;
  hasAvatar;
  
  constructor(public navCtrl: NavController, public platform: Platform, public actionSheetCtrl: ActionSheetController, public toastCtrl: ToastController, public usersService: UsersService, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.username = "";
    this.password = "";
    this.text = "";  
    this.avatar = "img/avatar.png";
    this.hasAvatar = false;  
  }
  presentAddPictureActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Add a profile picture',
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
        this.avatar = "data:image/jpeg;base64," + imageData;
        this.hasAvatar = true;
    }, (err) => {
        console.log(err);
    });
  }
  register(){
    this.loader = this.loadingCtrl.create({
      content: "Signing up..."
    });
    // var avatar = this.hasAvatar ? this.avatar : undefined;
    this.loader.present();
    this.usersService.defaultRegister(this.username, this.password).then((data:any) => {
      this.loader.dismiss();      
      if(data.success == true){
        this.presentToast();
        this.navCtrl.setRoot(LoginPage);
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'Error de registro!',
          subTitle: 'Ha ocurrido un error mientras se intentaba registrar un nuevo usuario.',
          buttons: ['OK']
        });
        alert.present();
      }
    },
    );
  }
  presentToast() {
    let toast = this.toastCtrl.create({
      message: "You've been succesfully registered. Now, let's start signing in!",
      showCloseButton: true,
      closeButtonText: 'Ok'
    });
    toast.present();
  }
}
