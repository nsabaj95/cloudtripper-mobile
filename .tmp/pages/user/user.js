import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TripsService } from '../../providers/trips-service';
import { LogsService } from '../../providers/logs-service';
import { UsersService } from '../../providers/users-service';
import { TripsSubscriptionsService } from '../../providers/trips-subscriptions-service';
import { Trip } from '../../models/trip';
import { LogHistoryPage } from '../log-history/log-history';
import { TripDetailsPage } from '../trip-details/trip-details';
import { TripMapPage } from '../trip-map/trip-map';
import { PhotoShowroomPage } from '../photo-showroom/photo-showroom';
// import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
// declare var google;
export var UserPage = (function () {
    // @ViewChild('map') mapElement: ElementRef;
    // map: any;
    // selectedLog: Log;
    // showMaps: boolean = false;
    // public base64Image : string;
    function UserPage(navCtrl, alertCtrl, logsService, tripsService, usersService, navParams, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.logsService = logsService;
        this.tripsService = tripsService;
        this.usersService = usersService;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.trips = [];
        this.subscriptions = [];
        this.tripsSubscriptionsService = TripsSubscriptionsService;
        this.user = navParams.get('user');
        this.defaultUrlImage = "../../assets/images/trip-default2.jpg";
        this.tripsService.getAllTripsBySubscriptor(UsersService.currentUser.id).then(function (data) {
            var newTrips = Object.keys(data).map(function (k) { return data[k]; })[1];
            for (var _i = 0, newTrips_1 = newTrips; _i < newTrips_1.length; _i++) {
                var t = newTrips_1[_i];
                _this.subscriptions.push(t.Id);
            }
        });
    }
    UserPage.prototype.ionViewDidLoad = function () {
        this.loadTrips();
    };
    UserPage.prototype.loadTrips = function () {
        var _this = this;
        this.loader = this.loadingCtrl.create({
            content: "Obteniendo viajes..."
        });
        this.loader.present();
        return new Promise(function (resolve) {
            _this.tripsService.getAllTripsByUser(_this.user.id).then(function (data) {
                var trips = Object.keys(data).map(function (k) { return data[k]; })[1];
                console.log(trips);
                for (var _i = 0, trips_1 = trips; _i < trips_1.length; _i++) {
                    var t = trips_1[_i];
                    var trip = new Trip(t.Id, t.Active, t.Destination, t.Origin, new Date(t.StartDate), new Date(t.EndDate), new Date(t.LastUpdate), t.NumberOfLogs, t.User_Id, t.HasImage, t.HasImage == 1 ? t.Image : "img/trip-default2.jpg", t.NumberOfSubscriptions);
                    trip.UserName = t.UserName;
                    if (_this.isTripSubscribed(t.Id)) {
                        trip.Subscribed = true;
                    }
                    _this.trips.push(trip);
                }
                console.log(_this.trips);
                _this.loader.dismiss();
                resolve(true);
            });
        });
    };
    UserPage.prototype.showTripLogs = function (trip) {
        if (trip.Subscribed) {
            this.navCtrl.push(LogHistoryPage, {
                trip: trip
            });
        }
    };
    UserPage.prototype.isTripSubscribed = function (trip_id) {
        var flag = false;
        var count = 0;
        while (!flag && count < this.subscriptions.length) {
            if (this.subscriptions[count] == trip_id) {
                flag = true;
            }
            count++;
        }
        return flag;
    };
    UserPage.prototype.loadTripsList = function (data) {
        var newTrips = Object.keys(data).map(function (k) { return data[k]; })[1];
        for (var _i = 0, newTrips_2 = newTrips; _i < newTrips_2.length; _i++) {
            var t = newTrips_2[_i];
            var trip = new Trip(t.Id, t.Active, t.Destination, t.Origin, new Date(t.StartDate), new Date(t.EndDate), new Date(t.LastUpdate), t.NumberOfLogs, t.User_Id, t.HasImage, t.HasImage == 1 ? t.Image : "img/trip-default2.jpg", t.NumberOfSubscriptions);
            trip.UserName = t.UserName;
            if (this.isTripSubscribed(t.Id)) {
                trip.Subscribed = true;
            }
            this.trips.push(trip);
        }
    };
    UserPage.prototype.loadLogs = function (trip) {
        this.navCtrl.push(LogHistoryPage, {
            trip: trip
        });
    };
    UserPage.prototype.showMap = function (trip_id) {
        this.navCtrl.push(TripMapPage, {
            trip_id: trip_id
        });
    };
    UserPage.prototype.showTripDetails = function (selectedTrip) {
        this.navCtrl.push(TripDetailsPage, {
            selectedTrip: selectedTrip
        });
    };
    UserPage.prototype.showTripPhotos = function (trip_id) {
        var _this = this;
        this.showLoader("Obteniendo imágenes...");
        var images = [];
        this.logsService.getAllLogsByTripId(trip_id).then(function (data) {
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
    UserPage.prototype.showLoader = function (message) {
        this.loader = this.loadingCtrl.create({
            content: message
        });
        this.loader.present();
    };
    UserPage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'user.html',
                    providers: [TripsService, UsersService, LogsService]
                },] },
    ];
    /** @nocollapse */
    UserPage.ctorParameters = [
        { type: NavController, },
        { type: AlertController, },
        { type: LogsService, },
        { type: TripsService, },
        { type: UsersService, },
        { type: NavParams, },
        { type: LoadingController, },
    ];
    return UserPage;
}());
