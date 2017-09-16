import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
export declare class PhotoShowroomPage {
    navCtrl: NavController;
    navParams: NavParams;
    images: any[];
    constructor(navCtrl: NavController, navParams: NavParams, sanitizier: DomSanitizer);
    ionViewDidEnter(): void;
    showPhoto(image: any): void;
}
