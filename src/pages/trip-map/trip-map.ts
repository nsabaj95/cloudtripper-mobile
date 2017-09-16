import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams ,LoadingController} from 'ionic-angular';
import {Log} from '../../models/log';
import {LogsService} from '../../providers/logs-service';
declare var google;

@Component({
  templateUrl: 'trip-map.html',
  providers: [LogsService]
})
export class TripMapPage {
  @ViewChild('tripMap') mapElement: ElementRef;
  tripMap: any;
  logs:Log[] = [];
  loader:any;
  trip_id;
  constructor(public navCtrl: NavController, public navParams: NavParams, public logsService: LogsService, public loadingCtrl: LoadingController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.trip_id = navParams.get('trip_id');
  }
  ionViewDidLoad(){
    // this.loader = this.loadingCtrl.create({
    //   content: "Please wait..."
    // });
    // this.loader.present();
    // this.loadLogs().then(()=>{
    //   this.loader.dismiss();
    // });;
    // this.loadMap();
  }
  ionViewDidEnter(){
    
  }
  
}
