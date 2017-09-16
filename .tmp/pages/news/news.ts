import moment from 'moment';
import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams,LoadingController} from 'ionic-angular';
import {Geolocation,PhotoViewer} from 'ionic-native';
import {Log} from '../../models/log';
import {LogsService} from '../../providers/logs-service';
import {DateTimeHelper} from '../../helpers/dateTimeHelper';
import {UsersService} from '../../providers/users-service';
import {TripsSubscriptionsService} from '../../providers/trips-subscriptions-service';
import {LogDetailsPage} from '../log-details/log-details';


declare var google;

@Component({
  templateUrl: 'news.html',
  providers: [LogsService, UsersService]
})
export class NewsPage {
  logs:Log[] = [];
  take:number = 10;
  skip:number = 0;
  loader:any;
  trip_id:any;
  lastUpdate:any;
  minDate = new Date().getFullYear();
  maxDate = new Date().getFullYear() + 2;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public logsService: LogsService) {
    this.trip_id = navParams.get('trip_id');
  }

  ionViewDidLoad(){
    this.showLoader("Cargando últimos registros...");
    this.loadLogs().then(()=>{
      this.loader.dismiss();
    });
  }

  loadLogs(){
    // var minutesOffset:number = new Date().getTimezoneOffset();
    this.lastUpdate = UsersService.currentUser.lastUpdate;
    return new Promise(resolve => {
      UsersService.currentUser.lastUpdate = DateTimeHelper.getUTCDate();
      var updateDate =  DateTimeHelper.getUTCDate();
      this.logsService.getLogsBySubscriptorId(this.skip, this.take, UsersService.currentUser.id, updateDate).then(data => {
          TripsSubscriptionsService.numberOfNews = 0;
          this.loadLogsList(data);
          resolve(true);
        });
    });
  }

  refreshLogs(refresher){
    this.skip = 0;
    this.logs = [];
    this.loadLogs().then(()=>{
      refresher.complete();
    });
  }

  logTapped(event, item) {
    this.navCtrl.push(LogDetailsPage, {
      selectedLog: item
    });
  }

  doInfinite(infiniteScroll:any) {
     this.skip+=this.take;
     this.loadLogs().then(()=>{
       infiniteScroll.complete();
     });
     
  }

  showPhoto(log : Log){
    PhotoViewer.show(log.image, log.title);
  }
  
  private loadLogsList(data){
    var minutesOffset:number = new Date().getTimezoneOffset();
    var newLogs = data;
    for(let log of newLogs) {
      let newLog:Log = new Log(log.id, log.title, log.message, log.locationEnabled == 1 ? true : false, DateTimeHelper.getLocalDateFromUTC(log.date), log.latitude, log.longitude, log.hasImage == 1 ? true : false, log.image);
      newLog.userName = log.username;
      newLog.trip = log.destination;
      this.logs.push(newLog);
    }
  }

  private showLoader(message){
    this.loader = this.loadingCtrl.create({
      content: message
    });
    this.loader.present();
  }


  private setDefaultListValues(){
    this.logs = [];
    this.take = 10;
    this.skip = 0;
  }
}
