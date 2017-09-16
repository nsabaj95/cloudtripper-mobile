import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TripsService } from '../../providers/trips-service';
import { LogsService } from '../../providers/logs-service';
import { UsersService } from '../../providers/users-service';
import { TripsSubscriptionsService } from '../../providers/trips-subscriptions-service';
import { Trip } from '../../models/trip';
import { LogHistoryPage } from '../log-history/log-history';
import { LogYourMomentPage } from '../log-your-moment/log-your-moment';
import { TripDetailsPage } from '../trip-details/trip-details';
import { NewTripPage } from '../new-trip/new-trip';
import { TripMapPage } from '../trip-map/trip-map';
// import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
// declare var google;
export var HomePage = (function () {
    // @ViewChild('map') mapElement: ElementRef;
    // map: any;
    // selectedLog: Log;
    // showMaps: boolean = false;
    // public base64Image : string;
    function HomePage(navCtrl, alertCtrl, logsService, tripsService, usersService, navParams, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.logsService = logsService;
        this.tripsService = tripsService;
        this.usersService = usersService;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.trips = [];
        this.tripsSubscriptionsService = TripsSubscriptionsService;
        this.user = UsersService.currentUser;
        this.defaultUrlImage = "../../assets/images/trip-default2.jpg";
    }
    HomePage.prototype.ionViewDidLoad = function () {
        this.loadTrips();
    };
    HomePage.prototype.loadTrips = function () {
        var _this = this;
        this.loader = this.loadingCtrl.create({
            content: "Getting trips..."
        });
        this.loader.present();
        return new Promise(function (resolve) {
            _this.tripsService.getAllTripsByUser(UsersService.currentUser.id).then(function (trips) {
                console.log(trips);
                for (var _i = 0, trips_1 = trips; _i < trips_1.length; _i++) {
                    var t = trips_1[_i];
                    var trip = new Trip(t.id, t.active, t.destination, t.origin, new Date(t.startDate), new Date(t.endDate), new Date(t.lastUpdate), t.numberOfLogs, t.user_id, t.hasImage, t.hasImage == 1 ? t.image : "img/trip-default2.jpg", t.numberOfSubscriptions);
                    _this.trips.push(trip);
                }
                _this.loader.dismiss();
                resolve(true);
            });
        });
    };
    HomePage.prototype.loadLogs = function (trip) {
        this.navCtrl.push(LogHistoryPage, {
            trip: trip
        });
    };
    HomePage.prototype.showMap = function (trip_id) {
        this.navCtrl.push(TripMapPage, {
            trip_id: trip_id
        });
    };
    HomePage.prototype.showTripDetails = function (selectedTrip) {
        this.navCtrl.push(TripDetailsPage, {
            selectedTrip: selectedTrip
        });
    };
    HomePage.prototype.addLog = function (trip_id) {
        this.navCtrl.push(LogYourMomentPage, {
            trip_id: trip_id
        });
    };
    HomePage.prototype.addTrip = function () {
        this.navCtrl.push(NewTripPage);
    };
    HomePage.prototype.deleteTrip = function (id) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: 'Are you sure you want to delete this trip?',
            message: "",
            buttons: [
                {
                    text: 'No',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function (data) {
                        _this.showLoader("Deleting trip...");
                        _this.tripsService.delete(id).then(function () {
                            _this.loader.dismiss();
                            _this.trips = [];
                            _this.loadTrips();
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    HomePage.prototype.showLoader = function (message) {
        this.loader = this.loadingCtrl.create({
            content: message
        });
        this.loader.present();
    };
    HomePage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'home.html',
                    providers: [TripsService, UsersService, LogsService]
                },] },
    ];
    /** @nocollapse */
    HomePage.ctorParameters = [
        { type: NavController, },
        { type: AlertController, },
        { type: LogsService, },
        { type: TripsService, },
        { type: UsersService, },
        { type: NavParams, },
        { type: LoadingController, },
    ];
    return HomePage;
}());
