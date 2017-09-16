import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { PhotoViewer } from 'ionic-native';
import { LogsService } from '../../providers/logs-service';
import { UsersService } from '../../providers/users-service';
import { LogDetailsPage } from '../log-details/log-details';
import { Log } from '../../models/log';
import { DateTimeHelper } from '../../helpers/dateTimeHelper';
export var LogHistoryPage = (function () {
    function LogHistoryPage(navCtrl, alertCtrl, navParams, loadingCtrl, logsService) {
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.logsService = logsService;
        this.logs = [];
        this.take = 10;
        this.skip = 0;
        this.viewMode = 'history';
        this.trip = navParams.get('trip');
        this.enableEditingPermissions = this.trip.User_Id == UsersService.currentUser.id;
    }
    LogHistoryPage.prototype.showPhoto = function (image) {
        PhotoViewer.show(image);
    };
    LogHistoryPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.showLoader("Loading history...");
        this.loadLogs().then(function () {
            _this.loader.dismiss();
        });
    };
    LogHistoryPage.prototype.switchViewMode = function (viewMode) {
        var _this = this;
        this.setDefaultListValues();
        this.viewMode = viewMode;
        this.showLoader(this.viewMode == 'history' ? "Loading history..." : "Loading map history...");
        this.loadLogs().then(function (data) {
            if (_this.viewMode == 'map') {
                _this.loadMap();
            }
            _this.loader.dismiss();
        });
    };
    LogHistoryPage.prototype.loadLogs = function () {
        var _this = this;
        return new Promise(function (resolve) {
            if (_this.viewMode == 'history') {
                _this.logsService.getLogsByTripId(_this.skip, _this.take, _this.trip.Id).then(function (data) {
                    _this.loadLogsList(data);
                    resolve(true);
                });
            }
            else if (_this.viewMode == 'map') {
                _this.logsService.getAllLogsByTripId(_this.trip.Id).then(function (data) {
                    _this.loadLogsList(data);
                    resolve(true);
                });
            }
        });
    };
    LogHistoryPage.prototype.refreshLogs = function (refresher) {
        this.skip = 0;
        this.logs = [];
        this.loadLogs().then(function () {
            refresher.complete();
        });
    };
    LogHistoryPage.prototype.logTapped = function (event, item) {
        this.navCtrl.push(LogDetailsPage, {
            selectedLog: item
        });
    };
    LogHistoryPage.prototype.delete = function (id) {
        var _this = this;
        var prompt = this.alertCtrl.create({
            title: '¿Desea eliminar este registro?',
            message: "",
            buttons: [
                {
                    text: 'No',
                    handler: function (data) {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Si',
                    handler: function (data) {
                        _this.showLoader("Eliminando registro...");
                        _this.logsService.delete(id, _this.trip.Id).then(function () {
                            _this.loader.dismiss();
                            _this.skip = 0;
                            _this.logs = [];
                            _this.showLoader("Obteniendo registros...");
                            _this.loadLogs().then(function () { return _this.loader.dismiss(); });
                        });
                    }
                }
            ]
        });
        prompt.present();
    };
    LogHistoryPage.prototype.doInfinite = function (infiniteScroll) {
        this.skip += this.take;
        this.loadLogs().then(function () {
            infiniteScroll.complete();
        });
    };
    LogHistoryPage.prototype.loadMap = function () {
        var _this = this;
        if (this.mapElement != undefined) {
            if (this.logs.length > 0) {
                var latLng = new google.maps.LatLng(+this.logs[0].position_lat, +this.logs[0].position_lng);
                var mapOptions = {
                    center: latLng,
                    zoom: 15,
                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                    disableDefaultUI: false
                };
                this.tripMap = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
                var bounds = new google.maps.LatLngBounds();
                var markers = new Array();
                var count = 0;
                this.logs.forEach(function (element) {
                    count++;
                    var lat = +element.position_lat;
                    var lng = +element.position_lng;
                    markers.push({ lat: lat, lng: lng });
                    var marker = new google.maps.Marker({
                        position: { lat: lat, lng: lng },
                        map: _this.tripMap,
                        title: element.title,
                        label: count.toString()
                    });
                    bounds.extend(marker.getPosition());
                    var infowindow = new google.maps.InfoWindow({
                        content: "<h4>" + element.title + "</h4><br/>" + element.date.toLocaleString() + "<br/>" + element.message
                    });
                    marker.addListener('click', function () {
                        infowindow.open(this.map, marker);
                    });
                });
                var flightPath = new google.maps.Polyline({
                    path: markers,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                    map: this.tripMap
                });
                this.tripMap.fitBounds(bounds);
            }
        }
    };
    LogHistoryPage.prototype.loadLogsList = function (newLogs) {
        var minutesOffset = new Date().getTimezoneOffset();
        for (var _i = 0, newLogs_1 = newLogs; _i < newLogs_1.length; _i++) {
            var log = newLogs_1[_i];
            var newLog = new Log(log.id, log.title, log.message, log.locationEnabled == 1 ? true : false, DateTimeHelper.getLocalDateFromUTC(log.date), log.latitude, log.longitude, log.hasImage == 1 ? true : false, log.image);
            newLog.userName = log.username != undefined ? log.username : log.name;
            newLog.trip = log.destination;
            this.logs.push(newLog);
        }
    };
    LogHistoryPage.prototype.showLoader = function (message) {
        this.loader = this.loadingCtrl.create({
            content: message
        });
        this.loader.present();
    };
    LogHistoryPage.prototype.setDefaultListValues = function () {
        this.logs = [];
        this.take = 10;
        this.skip = 0;
    };
    LogHistoryPage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'log-history.html',
                    providers: [LogsService]
                },] },
    ];
    /** @nocollapse */
    LogHistoryPage.ctorParameters = [
        { type: NavController, },
        { type: AlertController, },
        { type: NavParams, },
        { type: LoadingController, },
        { type: LogsService, },
    ];
    LogHistoryPage.propDecorators = {
        'mapElement': [{ type: ViewChild, args: ['tripMap',] },],
    };
    return LogHistoryPage;
}());
