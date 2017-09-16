import moment from 'moment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Transfer } from 'ionic-native';
import { AlertController } from 'ionic-angular';
import { Connection } from '../providers/connection';
import 'rxjs/add/operator/map';
export var TripsService = (function () {
    function TripsService(http, alertCtrl) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.apiurl = Connection.getUrl("trips");
    }
    TripsService.prototype.handleError = function (error) {
        console.log(error);
        return error.json().message || 'Server error, please try again later';
    };
    TripsService.prototype.getAllTripsByUser = function (user_id) {
        var link = this.apiurl + '?user_id=' + encodeURIComponent(user_id);
        console.log(user_id);
        return this.get(link);
    };
    TripsService.prototype.getAllTripsBySubscriptor = function (user_id) {
        var link = this.apiurl + '?subscriptor_id=' + encodeURIComponent(user_id);
        console.log(link);
        return this.get(link);
    };
    TripsService.prototype.getTrips = function (skip, take) {
        var link = this.apiurl + '?skip=' + encodeURIComponent(skip) + '&take=' + encodeURIComponent(take);
        return this.get(link);
    };
    TripsService.prototype.getTripsByUser = function (skip, take, user_id) {
        var link = this.apiurl + '?skip=' + encodeURIComponent(skip) + '&take=' + encodeURIComponent(take) + '&user_id=' + encodeURIComponent(user_id);
        return this.get(link);
    };
    TripsService.prototype.getTripsBySubscriptor = function (skip, take, subscriptor_id) {
        var link = this.apiurl + '?skip=' + encodeURIComponent(skip) + '&take=' + encodeURIComponent(take) + '&subscriptor_id=' + encodeURIComponent(subscriptor_id);
        return this.get(link);
    };
    TripsService.prototype.uploadImage = function (origin, destination, startDate, endDate, user_id, imgUrl, lastUpdate) {
        var _this = this;
        var ft = new Transfer();
        var filename = "img.jpg";
        var fileOptions = {
            fileKey: 'file',
            fileName: filename,
            mimeType: 'image/jpeg',
            chunkedMode: false,
            headers: {
                'Content-Type': undefined
            },
            params: {
                fileName: filename,
                origin: origin,
                destination: destination,
                startDate: startDate,
                endDate: endDate,
                user_id: user_id,
                lastUpdate: lastUpdate
            }
        };
        // ft.onProgress(this.onProgress);
        return new Promise(function (resolve) {
            ft.upload(imgUrl, _this.apiurl, fileOptions, false)
                .then(function (result) {
                // let alert = this.alertCtrl.create({
                //   title: 'Uploaded!',
                //   subTitle: result,
                //   buttons: ['OK']
                // });
                // alert.present();
                // this.success(result);
                resolve(result);
            }).catch(function (error) {
                var alert = _this.alertCtrl.create({
                    title: 'Error!',
                    subTitle: error,
                    buttons: ['OK']
                });
                alert.present();
            });
        });
    };
    TripsService.prototype.addTrip = function (origin, destination, startDate, endDate, user_id, imgUrl) {
        var _this = this;
        var lastUpdate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
        if (imgUrl != undefined) {
            return this.uploadImage(origin, destination, startDate, endDate, user_id, imgUrl, lastUpdate);
        }
        else {
            var data = JSON.stringify({ origin: origin, destination: destination, startDate: startDate, endDate: endDate, user_id: user_id, lastUpdate: lastUpdate });
            return new Promise(function (resolve) {
                _this.http.post(_this.apiurl, data)
                    .subscribe(function (data) {
                    resolve(data);
                }, function (error) {
                    console.log("ERROR!: ", error);
                });
            });
        }
    };
    TripsService.prototype.delete = function (id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.delete(_this.apiurl + "?id=" + id)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                console.log("Oooops!");
            });
        });
    };
    TripsService.prototype.get = function (link) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.get(link)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                console.log("Getting trips...");
                console.log(data);
                resolve(data.data);
            }, function (error) {
                console.log("Oooops!");
            });
        });
    };
    TripsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TripsService.ctorParameters = [
        { type: Http, },
        { type: AlertController, },
    ];
    return TripsService;
}());
