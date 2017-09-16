import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { User } from '../../models/user';
import { LogsService } from '../../providers/logs-service';
import { DomSanitizer } from '@angular/platform-browser';
import { TripsSubscriptionsService } from '../../providers/trips-subscriptions-service';
import { PhotoShowroomPage } from '../photo-showroom/photo-showroom';
export var TripDetailsPage = (function () {
    function TripDetailsPage(navCtrl, navParams, logsService, sanitizier, tripsSubscriptionsService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.logsService = logsService;
        this.tripsSubscriptionsService = tripsSubscriptionsService;
        this.loadingCtrl = loadingCtrl;
        this.showMaps = false;
        this.subscriptors = [];
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedTrip = navParams.get('selectedTrip');
        this.base64Image = this.selectedTrip.Image;
    }
    TripDetailsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log(this.selectedTrip.Id);
        this.tripsSubscriptionsService.getSubscriptions(this.selectedTrip.Id).then(function (data) {
            var users = Object.keys(data).map(function (k) { return data[k]; });
            for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
                var u = users_1[_i];
                console.log(u);
                _this.subscriptors.push(new User(u.UserName, "", u.Text, u.Id, u.LastUpdate, u.hasAvatar, u.HasAvatar == "1" ? u.Avatar : "img/avatar.png"));
            }
        });
    };
    TripDetailsPage.prototype.showTripPhotos = function () {
        var _this = this;
        this.showLoader("Getting trip photos...");
        var images = [];
        this.logsService.getAllLogsByTripId(this.selectedTrip.Id).then(function (data) {
            var logs = Object.keys(data).map(function (k) { return data[k]; })[1];
            for (var _i = 0, logs_1 = logs; _i < logs_1.length; _i++) {
                var l = logs_1[_i];
                images.push(l.Image);
            }
            _this.loader.dismiss();
            _this.navCtrl.push(PhotoShowroomPage, {
                images: images
            });
        });
    };
    TripDetailsPage.prototype.showLoader = function (message) {
        this.loader = this.loadingCtrl.create({
            content: message
        });
        this.loader.present();
    };
    // loadMap(){
    //   if(this.mapElement != undefined){
    //     let latLng = new google.maps.LatLng(this.selectedLog.position_lat, this.selectedLog.position_lng);
    //     let mapOptions = {
    //       center: latLng,
    //       zoom: 15,
    //       mapTypeId: google.maps.MapTypeId.ROADMAP,
    //       disableDefaultUI: true
    //     }
    //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    //     var marker = new google.maps.Marker({
    //       position: latLng,
    //       title: 'new marker',
    //       draggable: true,
    //       map: this.map
    //     });
    //     this.map.setCenter(marker.getPosition())    
    //   }
    // }
    TripDetailsPage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'trip-details.html',
                    providers: [LogsService]
                },] },
    ];
    /** @nocollapse */
    TripDetailsPage.ctorParameters = [
        { type: NavController, },
        { type: NavParams, },
        { type: LogsService, },
        { type: DomSanitizer, },
        { type: TripsSubscriptionsService, },
        { type: LoadingController, },
    ];
    TripDetailsPage.propDecorators = {
        'mapElement': [{ type: ViewChild, args: ['map',] },],
    };
    return TripDetailsPage;
}());
