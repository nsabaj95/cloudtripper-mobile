import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Platform, ActionSheetController, ToastController } from 'ionic-angular';
import { UsersService } from '../../providers/users-service';
import { LoginPage } from '../login/login';
import { Camera } from 'ionic-native';
export var RegisterPage = (function () {
    function RegisterPage(navCtrl, platform, actionSheetCtrl, toastCtrl, usersService, loadingCtrl, alertCtrl) {
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.actionSheetCtrl = actionSheetCtrl;
        this.toastCtrl = toastCtrl;
        this.usersService = usersService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.username = "";
        this.password = "";
        this.text = "";
        this.avatar = "img/avatar.png";
        this.hasAvatar = false;
    }
    RegisterPage.prototype.presentAddPictureActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Add a profile picture',
            buttons: [
                {
                    icon: 'aperture',
                    text: 'Take a picture',
                    handler: function () {
                        _this.takePicture(Camera.PictureSourceType.CAMERA);
                    }
                }, {
                    icon: 'albums',
                    text: 'Upload from library',
                    handler: function () {
                        _this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
                    }
                }
            ]
        });
        actionSheet.present();
    };
    RegisterPage.prototype.takePicture = function (pictureSourceType) {
        var _this = this;
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: pictureSourceType,
            targetWidth: 1000,
            targetHeight: 1000
        }).then(function (imageData) {
            _this.avatar = "data:image/jpeg;base64," + imageData;
            _this.hasAvatar = true;
        }, function (err) {
            console.log(err);
        });
    };
    RegisterPage.prototype.register = function () {
        var _this = this;
        this.loader = this.loadingCtrl.create({
            content: "Signing up..."
        });
        var avatar = this.hasAvatar ? this.avatar : undefined;
        this.loader.present();
        this.usersService.defaultRegister(this.username, this.password).then(function (data) {
            _this.loader.dismiss();
            if (data.success == true) {
                _this.presentToast();
                _this.navCtrl.setRoot(LoginPage);
            }
            else {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Error de registro!',
                    subTitle: 'Ha ocurrido un error mientras se intentaba registrar un nuevo usuario.',
                    buttons: ['OK']
                });
                alert_1.present();
            }
        });
    };
    RegisterPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: "You've been succesfully registered. Now, let's start signing in!",
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    };
    RegisterPage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'register.html',
                    providers: [UsersService]
                },] },
    ];
    /** @nocollapse */
    RegisterPage.ctorParameters = [
        { type: NavController, },
        { type: Platform, },
        { type: ActionSheetController, },
        { type: ToastController, },
        { type: UsersService, },
        { type: LoadingController, },
        { type: AlertController, },
    ];
    return RegisterPage;
}());
