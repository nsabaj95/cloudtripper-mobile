import { ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Log } from '../../models/log';
import { DomSanitizer } from '@angular/platform-browser';
export declare class LogDetailsPage {
    navCtrl: NavController;
    navParams: NavParams;
    mapElement: ElementRef;
    map: any;
    selectedLog: Log;
    showMaps: boolean;
    base64Image: string;
    constructor(navCtrl: NavController, navParams: NavParams, sanitizier: DomSanitizer);
    ionViewDidEnter(): void;
    showPhoto(log: Log): void;
    loadMap(): void;
}
