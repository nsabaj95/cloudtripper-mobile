import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { PhotoViewer } from 'ionic-native';
import { Log } from '../../models/log';
import { LogsService } from '../../providers/logs-service';
import { DateTimeHelper } from '../../helpers/dateTimeHelper';
import { UsersService } from '../../providers/users-service';
import { TripsSubscriptionsService } from '../../providers/trips-subscriptions-service';
import { LogDetailsPage } from '../log-details/log-details';
export var NewsPage = (function () {
    function NewsPage(navCtrl, navParams, loadingCtrl, logsService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.logsService = logsService;
        this.logs = [];
        this.take = 10;
        this.skip = 0;
        this.minDate = new Date().getFullYear();
        this.maxDate = new Date().getFullYear() + 2;
        this.trip_id = navParams.get('trip_id');
    }
    NewsPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.showLoader("Cargando últimos registros...");
        this.loadLogs().then(function () {
            _this.loader.dismiss();
        });
    };
    NewsPage.prototype.loadLogs = function () {
        var _this = this;
        // var minutesOffset:number = new Date().getTimezoneOffset();
        this.lastUpdate = UsersService.currentUser.lastUpdate;
        return new Promise(function (resolve) {
            UsersService.currentUser.lastUpdate = DateTimeHelper.getUTCDate();
            var updateDate = DateTimeHelper.getUTCDate();
            _this.logsService.getLogsBySubscriptorId(_this.skip, _this.take, UsersService.currentUser.id, updateDate).then(function (data) {
                TripsSubscriptionsService.numberOfNews = 0;
                _this.loadLogsList(data);
                resolve(true);
            });
        });
    };
    NewsPage.prototype.refreshLogs = function (refresher) {
        this.skip = 0;
        this.logs = [];
        this.loadLogs().then(function () {
            refresher.complete();
        });
    };
    NewsPage.prototype.logTapped = function (event, item) {
        this.navCtrl.push(LogDetailsPage, {
            selectedLog: item
        });
    };
    NewsPage.prototype.doInfinite = function (infiniteScroll) {
        this.skip += this.take;
        this.loadLogs().then(function () {
            infiniteScroll.complete();
        });
    };
    NewsPage.prototype.showPhoto = function (log) {
        PhotoViewer.show(log.image, log.title);
    };
    NewsPage.prototype.loadLogsList = function (data) {
        var minutesOffset = new Date().getTimezoneOffset();
        var newLogs = data;
        for (var _i = 0, newLogs_1 = newLogs; _i < newLogs_1.length; _i++) {
            var log = newLogs_1[_i];
            var newLog = new Log(log.id, log.title, log.message, log.locationEnabled == 1 ? true : false, DateTimeHelper.getLocalDateFromUTC(log.date), log.latitude, log.longitude, log.hasImage == 1 ? true : false, log.image);
            newLog.userName = log.username;
            newLog.trip = log.destination;
            this.logs.push(newLog);
        }
    };
    NewsPage.prototype.showLoader = function (message) {
        this.loader = this.loadingCtrl.create({
            content: message
        });
        this.loader.present();
    };
    NewsPage.prototype.setDefaultListValues = function () {
        this.logs = [];
        this.take = 10;
        this.skip = 0;
    };
    NewsPage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'news.html',
                    providers: [LogsService, UsersService]
                },] },
    ];
    /** @nocollapse */
    NewsPage.ctorParameters = [
        { type: NavController, },
        { type: NavParams, },
        { type: LoadingController, },
        { type: LogsService, },
    ];
    return NewsPage;
}());
