import { ElementRef } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Trip } from '../../models/trip';
import { LogsService } from '../../providers/logs-service';
import { DomSanitizer } from '@angular/platform-browser';
import { TripsSubscriptionsService } from '../../providers/trips-subscriptions-service';
export declare class TripDetailsPage {
    navCtrl: NavController;
    navParams: NavParams;
    logsService: LogsService;
    tripsSubscriptionsService: TripsSubscriptionsService;
    loadingCtrl: LoadingController;
    mapElement: ElementRef;
    map: any;
    selectedTrip: Trip;
    showMaps: boolean;
    subscriptors: any;
    loader: any;
    base64Image: string;
    constructor(navCtrl: NavController, navParams: NavParams, logsService: LogsService, sanitizier: DomSanitizer, tripsSubscriptionsService: TripsSubscriptionsService, loadingCtrl: LoadingController);
    ionViewDidEnter(): void;
    showTripPhotos(): void;
    private showLoader(message);
}
