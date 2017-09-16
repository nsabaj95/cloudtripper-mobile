import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { Connection } from '../providers/connection';
import 'rxjs/add/operator/map';
export var TripsSubscriptionsService = (function () {
    function TripsSubscriptionsService(http, alertCtrl) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.apiurl = Connection.getUrl("subscriptions");
    }
    TripsSubscriptionsService.prototype.handleError = function (error) {
        console.log(error);
        return error.json().message || 'Server error, please try again later';
    };
    TripsSubscriptionsService.prototype.getNumberOfNews = function (fromDate, user_id) {
        var _this = this;
        return new Promise(function (resolve) {
            var url = _this.apiurl + '?subscriptor_id=' + user_id + '&fromDate=' + encodeURIComponent(fromDate);
            console.log(url);
            _this.http.get(url)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data.data);
            }, function (error) {
                console.log("ERROR!: ", error);
                resolve(error);
            });
        });
    };
    TripsSubscriptionsService.prototype.subscribe = function (user_id, trip_id) {
        var _this = this;
        var data = JSON.stringify({ user_id: user_id, trip_id: trip_id });
        console.log('Json data: ' + data);
        return new Promise(function (resolve) {
            _this.http.post(_this.apiurl, data)
                .subscribe(function (data) {
                console.log(data);
                resolve(data);
            }, function (error) {
                console.log("ERROR!: ", error);
            });
        });
    };
    TripsSubscriptionsService.prototype.unsubscribe = function (user_id, trip_id) {
        var _this = this;
        var link = this.apiurl + '?user_id=' + encodeURIComponent(user_id) + '&trip_id=' + encodeURIComponent(trip_id);
        console.log(link);
        return new Promise(function (resolve) {
            _this.http.delete(link)
                .subscribe(function (data) {
                console.log(data);
                resolve(data);
            }, function (error) {
                console.log("ERROR!: ", error);
            });
        });
    };
    TripsSubscriptionsService.prototype.getSubscriptions = function (trip_id) {
        var _this = this;
        return new Promise(function (resolve) {
            var url = _this.apiurl + '?trip_id=' + trip_id;
            console.log(url);
            _this.http.get(url)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data.data);
            }, function (error) {
                console.log("ERROR!: ", error);
                resolve(error);
            });
        });
    };
    TripsSubscriptionsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TripsSubscriptionsService.ctorParameters = [
        { type: Http, },
        { type: AlertController, },
    ];
    return TripsSubscriptionsService;
}());
