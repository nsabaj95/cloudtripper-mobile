import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Transfer } from 'ionic-native';
import { AlertController } from 'ionic-angular';
import { Connection } from '../providers/connection';
import 'rxjs/add/operator/map';
export var LogsService = (function () {
    function LogsService(http, alertCtrl) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.apiurl = Connection.getUrl("logs");
    }
    LogsService.prototype.handleError = function (error) {
        console.log(error);
        return error.json().message || 'Server error, please try again later';
    };
    LogsService.prototype.getAllLogs = function () {
        return this.getLogs("");
    };
    LogsService.prototype.getAllLogsByTripId = function (trip_id) {
        return this.getLogs('?trip_id=' + encodeURIComponent(trip_id));
    };
    LogsService.prototype.getLogsByTripId = function (skip, take, trip_id) {
        return this.getLogs('?skip=' + encodeURIComponent(skip) + '&take=' + encodeURIComponent(take) + '&trip_id=' + encodeURIComponent(trip_id));
    };
    LogsService.prototype.getLogsBySubscriptorId = function (skip, take, subscriptor_id, updateDate) {
        return this.getLogs('?skip=' + encodeURIComponent(skip) + '&take=' + encodeURIComponent(take) + '&subscriptor_id=' + encodeURIComponent(subscriptor_id) + '&updateDate=' + encodeURIComponent(updateDate));
    };
    LogsService.prototype.uploadImage = function (title, message, positionEnabled, lat, lng, date, imgUrl, trip_id) {
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
                title: title,
                message: message,
                positionEnabled: positionEnabled,
                latitude: lat,
                longitude: lng,
                trip_id: trip_id,
                date: date
            }
        };
        return new Promise(function (resolve) {
            ft.upload(imgUrl, _this.apiurl, fileOptions, false)
                .then(function (result) {
                console.log(result);
                resolve(result);
            }).catch(function (error) {
                console.log(error);
                var alert = _this.alertCtrl.create({
                    title: 'Error!',
                    subTitle: error,
                    buttons: ['OK']
                });
                alert.present();
            });
        });
    };
    LogsService.prototype.onProgress = function () {
        console.log('cargando');
    };
    LogsService.prototype.addLog = function (title, message, positionEnabled, lat, lng, date, imgUrl, trip_id) {
        var _this = this;
        lng = lng.replace(",", ".");
        lat = lat.replace(",", ".");
        if (imgUrl != undefined) {
            return this.uploadImage(title, message, positionEnabled, lat, lng, date, imgUrl, trip_id);
        }
        else {
            var data = JSON.stringify({ title: title, message: message, positionEnabled: positionEnabled, date: date, latitude: lat, longitude: lng, trip_id: trip_id });
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
    LogsService.prototype.delete = function (id, trip_id) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.delete(_this.apiurl + "?id=" + id + "&trip_id=" + trip_id)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                console.log(error);
            });
        });
    };
    LogsService.prototype.getLogs = function (data) {
        var _this = this;
        var link = this.apiurl + data;
        return new Promise(function (resolve) {
            _this.http.get(link)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data.data);
            }, function (error) {
                console.log("Oooops!");
            });
        });
    };
    LogsService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    LogsService.ctorParameters = [
        { type: Http, },
        { type: AlertController, },
    ];
    return LogsService;
}());
