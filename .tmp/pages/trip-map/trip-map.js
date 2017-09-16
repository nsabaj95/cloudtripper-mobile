import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { LogsService } from '../../providers/logs-service';
export var TripMapPage = (function () {
    function TripMapPage(navCtrl, navParams, logsService, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.logsService = logsService;
        this.loadingCtrl = loadingCtrl;
        this.logs = [];
        // If we navigated to this page, we will have an item available as a nav param
        this.trip_id = navParams.get('trip_id');
    }
    TripMapPage.prototype.ionViewDidLoad = function () {
        // this.loader = this.loadingCtrl.create({
        //   content: "Please wait..."
        // });
        // this.loader.present();
        // this.loadLogs().then(()=>{
        //   this.loader.dismiss();
        // });;
        // this.loadMap();
    };
    TripMapPage.prototype.ionViewDidEnter = function () {
    };
    TripMapPage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'trip-map.html',
                    providers: [LogsService]
                },] },
    ];
    /** @nocollapse */
    TripMapPage.ctorParameters = [
        { type: NavController, },
        { type: NavParams, },
        { type: LogsService, },
        { type: LoadingController, },
    ];
    TripMapPage.propDecorators = {
        'mapElement': [{ type: ViewChild, args: ['tripMap',] },],
    };
    return TripMapPage;
}());
