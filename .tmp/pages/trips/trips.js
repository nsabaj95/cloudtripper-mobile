import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { TripsService } from '../../providers/trips-service';
import { TripsSubscriptionsService } from '../../providers/trips-subscriptions-service';
import { UsersService } from '../../providers/users-service';
import { LogsService } from '../../providers/logs-service';
import { Trip } from '../../models/trip';
import { TripDetailsPage } from '../trip-details/trip-details';
import { TripMapPage } from '../trip-map/trip-map';
import { LogHistoryPage } from '../log-history/log-history';
import { PhotoShowroomPage } from '../photo-showroom/photo-showroom';
export var TripsPage = (function () {
    function TripsPage(navCtrl, logsService, tripsSubscriptionsService, navParams, loadingCtrl, tripsService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.logsService = logsService;
        this.tripsSubscriptionsService = tripsSubscriptionsService;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.tripsService = tripsService;
        this.trips = [];
        this.subscriptions = [];
        this.take = 10;
        this.skip = 0;
        this.listType = "subscriptions";
        this.numberOfSubscriptions = 0;
        this.trip_id = navParams.get('trip_id');
        this.tripsService.getAllTripsBySubscriptor(UsersService.currentUser.id).then(function (data) {
            var newTrips = data;
            for (var _i = 0, newTrips_1 = newTrips; _i < newTrips_1.length; _i++) {
                var t = newTrips_1[_i];
                _this.numberOfSubscriptions++;
                _this.subscriptions.push(t.Id);
            }
        });
    }
    TripsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loader = this.loadingCtrl.create({
            content: "Getting trips..."
        });
        this.loader.present();
        this.loadTrips().then(function () {
            _this.loader.dismiss();
        });
    };
    TripsPage.prototype.switchListType = function (listType) {
        var _this = this;
        this.setDefaultListValues();
        this.listType = listType;
        this.loader = this.loadingCtrl.create({
            content: "Getting trips..."
        });
        this.loader.present();
        this.loadTrips().then(function () {
            _this.loader.dismiss();
        });
    };
    TripsPage.prototype.loadTrips = function () {
        var _this = this;
        return new Promise(function (resolve) {
            switch (_this.listType) {
                case "all":
                    _this.tripsService.getTrips(_this.skip, _this.take).then(function (data) {
                        _this.loadTripsList(data);
                        resolve(true);
                    });
                    break;
                case "subscriptions":
                    _this.tripsService.getTripsBySubscriptor(_this.skip, _this.take, UsersService.currentUser.id).then(function (data) {
                        _this.loadTripsList(data);
                        resolve(true);
                    });
                    break;
            }
        });
    };
    TripsPage.prototype.subscribe = function (trip) {
        this.numberOfSubscriptions++;
        trip.NumberOfSubscriptions++;
        this.subscriptions.push(trip.Id);
        trip.Subscribed = true;
        var user_id = UsersService.currentUser.id;
        this.tripsSubscriptionsService.subscribe(user_id, trip.Id);
    };
    TripsPage.prototype.unsubscribe = function (trip) {
        this.numberOfSubscriptions--;
        trip.NumberOfSubscriptions--;
        var index = this.subscriptions.indexOf(trip.Id, 0);
        if (index > -1) {
            this.subscriptions.splice(index, 1);
        }
        trip.Subscribed = false;
        if (this.listType == "subscriptions") {
            var index = this.trips.indexOf(trip, 0);
            if (index > -1) {
                this.trips.splice(index, 1);
            }
        }
        var user_id = UsersService.currentUser.id;
        this.tripsSubscriptionsService.unsubscribe(user_id, trip.Id);
    };
    TripsPage.prototype.refreshTrips = function (refresher) {
        this.skip = 0;
        this.trips = [];
        this.loadTrips().then(function () {
            refresher.complete();
        });
    };
    // logTapped(event, item) {
    //   this.navCtrl.push(LogDetailsPage, {
    //     selectedLog: item
    //   });
    // }
    TripsPage.prototype.doInfinite = function (infiniteScroll) {
        this.skip += this.take;
        this.loadTrips().then(function () {
            infiniteScroll.complete();
        });
    };
    TripsPage.prototype.isTripSubscribed = function (trip_id) {
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
    TripsPage.prototype.loadTripsList = function (newTrips) {
        for (var _i = 0, newTrips_2 = newTrips; _i < newTrips_2.length; _i++) {
            var t = newTrips_2[_i];
            var trip = new Trip(t.id, t.active, t.destination, t.origin, new Date(t.startDate), new Date(t.endDate), new Date(t.lastUpdate), t.numberOfLogs, t.user_id, t.hasImage, t.hasImage == 1 ? t.image : "img/trip-default2.jpg", t.numberOfSubscriptions);
            trip.UserName = t.username;
            if (this.listType == "subscriptions" || this.isTripSubscribed(t.Id)) {
                trip.Subscribed = true;
            }
            this.trips.push(trip);
        }
    };
    TripsPage.prototype.showMap = function (trip_id) {
        this.navCtrl.push(TripMapPage, {
            trip_id: trip_id
        });
    };
    TripsPage.prototype.showTripDetails = function (selectedTrip) {
        this.navCtrl.push(TripDetailsPage, {
            selectedTrip: selectedTrip
        });
    };
    TripsPage.prototype.showTripLogs = function (trip) {
        if (trip.Subscribed) {
            this.navCtrl.push(LogHistoryPage, {
                trip: trip
            });
        }
    };
    TripsPage.prototype.showTripPhotos = function (trip_id) {
        var _this = this;
        this.showLoader("Getting trip photos...");
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
    TripsPage.prototype.setDefaultListValues = function () {
        this.trips = [];
        this.take = 10;
        this.skip = 0;
    };
    TripsPage.prototype.showLoader = function (message) {
        this.loader = this.loadingCtrl.create({
            content: message
        });
        this.loader.present();
    };
    TripsPage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'trips.html',
                    providers: [TripsService, TripsSubscriptionsService, LogsService]
                },] },
    ];
    /** @nocollapse */
    TripsPage.ctorParameters = [
        { type: NavController, },
        { type: LogsService, },
        { type: TripsSubscriptionsService, },
        { type: NavParams, },
        { type: LoadingController, },
        { type: TripsService, },
    ];
    return TripsPage;
}());
