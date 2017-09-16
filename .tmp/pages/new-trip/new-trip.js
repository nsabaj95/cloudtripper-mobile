import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, ActionSheetController, NavParams, ToastController } from 'ionic-angular';
import { Camera } from 'ionic-native';
import { TripsService } from '../../providers/trips-service';
import { UsersService } from '../../providers/users-service';
import { HomePage } from '../home/home';
// import 'whatwg-fetch';
// cope, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet
export var NewTripPage = (function () {
    function NewTripPage(navCtrl, usersService, tripsService, toastCtrl, navParams, alertCtrl, loadingCtrl, actionSheetCtrl) {
        this.navCtrl = navCtrl;
        this.usersService = usersService;
        this.tripsService = tripsService;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.origin = '';
        this.destination = '';
        this.startDate = '';
        this.endDate = '';
        this.user_id = UsersService.currentUser.id;
        this.loader = this.loadingCtrl.create({
            content: "Adding new trip..."
        });
    }
    NewTripPage.prototype.presentAddPictureActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Add a picture',
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
    NewTripPage.prototype.takePicture = function (pictureSourceType) {
        var _this = this;
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            sourceType: pictureSourceType,
            targetWidth: 1000,
            targetHeight: 1000
        }).then(function (imageData) {
            _this.base64Image = "data:image/jpeg;base64," + imageData;
        }, function (err) {
            console.log(err);
        });
    };
    NewTripPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'Your log message has been sent!',
            buttons: ['OK']
        });
        alert.present();
    };
    NewTripPage.prototype.submit = function () {
        var _this = this;
        this.loader.present();
        var lat = '0';
        var lng = '0';
        this.tripsService.addTrip(this.origin, this.destination, this.startDate, this.endDate, this.user_id, this.base64Image)
            .then(function (data) {
            _this.loader.dismiss();
            _this.presentToast();
            _this.navCtrl.setRoot(HomePage);
        });
    };
    NewTripPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'Trip was added successfully',
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    };
    NewTripPage.prototype.ionViewDidLoad = function () {
    };
    NewTripPage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'new-trip.html',
                    providers: [TripsService, UsersService]
                },] },
    ];
    /** @nocollapse */
    NewTripPage.ctorParameters = [
        { type: NavController, },
        { type: UsersService, },
        { type: TripsService, },
        { type: ToastController, },
        { type: NavParams, },
        { type: AlertController, },
        { type: LoadingController, },
        { type: ActionSheetController, },
    ];
    return NewTripPage;
}());
