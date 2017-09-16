import { DateTimeHelper } from '../../helpers/dateTimeHelper';
import { Component, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, AlertController, LoadingController, ActionSheetController, NavParams, ToastController } from 'ionic-angular';
import { Geolocation, Camera } from 'ionic-native';
import { LogsService } from '../../providers/logs-service';
import { HomePage } from '../home/home';
// import 'whatwg-fetch';
// cope, $cordovaCamera, $cordovaFile, $cordovaFileTransfer, $cordovaDevice, $ionicPopup, $cordovaActionSheet
export var LogYourMomentPage = (function () {
    function LogYourMomentPage(navCtrl, toastCtrl, navParams, logsService, alertCtrl, loadingCtrl, actionSheetCtrl, domSanitizer) {
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.navParams = navParams;
        this.logsService = logsService;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.domSanitizer = domSanitizer;
        this.message = '';
        this.title = '';
        this.sendLocation = true;
        this.trip_id = navParams.get('trip_id');
        this.loader = this.loadingCtrl.create({
            content: "Agregando nuevo registro..."
        });
        this.dateTime = new Date().toISOString();
    }
    LogYourMomentPage.prototype.loadMap = function () {
        var _this = this;
        Geolocation.getCurrentPosition().then(function (position) {
            if (_this.sendLocation) {
                var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                var mapOptions = {
                    center: latLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
                _this.setMapPosition(latLng);
                _this.map.addListener('click', function (e) {
                    _this.marker.setPosition(e.latLng);
                });
            }
        }, function (err) {
            console.log(err);
        });
    };
    LogYourMomentPage.prototype.setMapPosition = function (latlng) {
        if (this.marker != undefined) {
            this.marker.setPosition(latlng);
        }
        else {
            this.marker = new google.maps.Marker({
                position: latlng,
                map: this.map
            });
        }
        this.marker.setMap(this.map);
        this.map.panTo(latlng);
        console.log(this.marker);
    };
    LogYourMomentPage.prototype.presentAddPictureActionSheet = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Agregar una imágen',
            buttons: [
                {
                    icon: 'aperture',
                    text: 'Tomar una foto',
                    handler: function () {
                        _this.takePicture(Camera.PictureSourceType.CAMERA);
                    }
                }, {
                    icon: 'albums',
                    text: 'Cargar desde la librería',
                    handler: function () {
                        _this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
                    }
                }
            ]
        });
        actionSheet.present();
    };
    LogYourMomentPage.prototype.takePicture = function (pictureSourceType) {
        var _this = this;
        Camera.getPicture({
            destinationType: Camera.DestinationType.NATIVE_URI,
            sourceType: pictureSourceType
        }).then(function (imageData) {
            var analizandoImagenLoader = _this.loadingCtrl.create({
                content: "Analizando imágen..."
            });
            analizandoImagenLoader.present();
            _this.image_safe_url = _this.domSanitizer.bypassSecurityTrustUrl(imageData);
            _this.image_native_url = imageData;
            CordovaExif.readData(_this.image_native_url, function (exifObject) {
                var gpsLatitude = exifObject.GPSLatitude;
                var gpsLongitude = exifObject.GPSLongitude;
                analizandoImagenLoader.dismiss();
                if ((gpsLatitude != undefined && gpsLongitude != undefined) || exifObject.DateTimeOriginal != undefined) {
                    var importandoInformacionLoader = _this.loadingCtrl.create({
                        content: "Importando información de imágen..."
                    });
                    importandoInformacionLoader.present();
                    if (gpsLatitude != undefined && gpsLongitude != undefined) {
                        console.log("importando gps lat");
                        var lat = _this.convertDMSToDD(gpsLatitude[0].numerator / gpsLatitude[0].denominator, gpsLatitude[1].numerator / gpsLatitude[1].denominator, gpsLatitude[2].numerator / gpsLatitude[2].denominator, exifObject.GPSLatitudeRef);
                        console.log("importando gps lng");
                        var lng = _this.convertDMSToDD(gpsLongitude[0].numerator / gpsLongitude[0].denominator, gpsLongitude[1].numerator / gpsLongitude[1].denominator, gpsLongitude[2].numerator / gpsLongitude[2].denominator, exifObject.GPSLongitudeRef);
                        var latlng = new google.maps.LatLng(lat, lng);
                        _this.setMapPosition(latlng);
                    }
                    if (exifObject.DateTimeOriginal != undefined) {
                        console.log("importando horario");
                        var dateTimeArray = exifObject.DateTimeOriginal.split(" ");
                        var dateArray = dateTimeArray[0].split(":");
                        var timeArray = dateTimeArray[1].split(":");
                        var date = new Date(dateArray[0], dateArray[1], dateArray[2], timeArray[0], timeArray[1], timeArray[2]);
                        _this.dateTime = date.toISOString();
                    }
                    importandoInformacionLoader.dismiss();
                }
            });
        }, function (err) {
            console.log(err);
        });
    };
    LogYourMomentPage.prototype.showAlert = function () {
        var alert = this.alertCtrl.create({
            title: 'Success!',
            subTitle: 'Your log message has been sent!',
            buttons: ['OK']
        });
        alert.present();
    };
    LogYourMomentPage.prototype.submit = function () {
        var _this = this;
        this.loader.present();
        var lat = '0';
        var lng = '0';
        var dateTime = DateTimeHelper.getUTCDateFromLocal(new Date(this.dateTime));
        if (this.sendLocation) {
            // Geolocation.getCurrentPosition().then((position) => {
            console.log(this.marker);
            lat = this.marker.position.lat().toString().replace('.', ',');
            lng = this.marker.position.lng().toString().replace('.', ',');
            // console.log();
            // console.log(new Date().toISOString());
            this.logsService.addLog(this.title, this.message, this.sendLocation, lat, lng, dateTime, this.image_native_url, this.trip_id)
                .then(function (data) {
                _this.loader.dismiss();
                _this.presentToast();
                _this.navCtrl.setRoot(HomePage);
            });
        }
        else {
            this.logsService.addLog(this.title, this.message, this.sendLocation, lat, lng, dateTime, this.image_native_url, this.trip_id)
                .then(function (data) {
                _this.loader.dismiss();
                _this.presentToast();
                _this.navCtrl.setRoot(HomePage);
            });
        }
    };
    LogYourMomentPage.prototype.presentToast = function () {
        var toast = this.toastCtrl.create({
            message: 'El registro fue agregado satisfactoriamente.',
            showCloseButton: true,
            closeButtonText: 'Ok'
        });
        toast.present();
    };
    LogYourMomentPage.prototype.ionViewDidLoad = function () {
        this.loadMap();
    };
    LogYourMomentPage.prototype.convertDMSToDD = function (degrees, minutes, seconds, direction) {
        var dd = degrees + minutes / 60 + seconds / (60 * 60);
        if (direction == "S" || direction == "W") {
            dd = dd * -1;
        } // Don't do anything for N or E
        return dd;
    };
    LogYourMomentPage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'log-your-moment.html',
                    providers: [LogsService]
                },] },
    ];
    /** @nocollapse */
    LogYourMomentPage.ctorParameters = [
        { type: NavController, },
        { type: ToastController, },
        { type: NavParams, },
        { type: LogsService, },
        { type: AlertController, },
        { type: LoadingController, },
        { type: ActionSheetController, },
        { type: DomSanitizer, },
    ];
    LogYourMomentPage.propDecorators = {
        'mapElement': [{ type: ViewChild, args: ['map',] },],
    };
    return LogYourMomentPage;
}());
