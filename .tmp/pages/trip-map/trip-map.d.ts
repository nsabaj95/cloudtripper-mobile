import { ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Log } from '../../models/log';
import { LogsService } from '../../providers/logs-service';
export declare class TripMapPage {
    navCtrl: NavController;
    navParams: NavParams;
    logsService: LogsService;
    loadingCtrl: LoadingController;
    mapElement: ElementRef;
    tripMap: any;
    logs: Log[];
    loader: any;
    trip_id: any;
    constructor(navCtrl: NavController, navParams: NavParams, logsService: LogsService, loadingCtrl: LoadingController);
    ionViewDidLoad(): void;
    ionViewDidEnter(): void;
}
