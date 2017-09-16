import moment from 'moment';
import {Component, ViewChild, ElementRef} from '@angular/core';
import {NavController, NavParams,LoadingController,AlertController} from 'ionic-angular';
import {Geolocation,PhotoViewer} from 'ionic-native';
import {LogsService} from '../../providers/logs-service';
import {UsersService} from '../../providers/users-service';
import {LogDetailsPage} from '../log-details/log-details';
import {Log} from '../../models/log';
import {DateTimeHelper} from '../../helpers/dateTimeHelper';

declare var google;

@Component({
  templateUrl: 'log-history.html',
  providers: [LogsService]
})
export class LogHistoryPage {
  @ViewChild('tripMap') mapElement: ElementRef;
  logs:Log[] = [];
  take:number = 10;
  skip:number = 0;
  loader:any;
  trip:any;
  tripMap:any;
  viewMode='history';
  enableEditingPermissions:any;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public navParams: NavParams, public loadingCtrl: LoadingController, public logsService: LogsService) {
    this.trip = navParams.get('trip');
    this.enableEditingPermissions = this.trip.User_Id == UsersService.currentUser.id;
  }

  showPhoto(image){
    PhotoViewer.show(image);
  }

  ionViewDidLoad(){
    this.showLoader("Loading history...");
    this.loadLogs().then(()=>{
      this.loader.dismiss();
    });
  }

  switchViewMode(viewMode){
    this.setDefaultListValues();
    this.viewMode = viewMode;
    this.showLoader(this.viewMode == 'history' ? "Loading history..." : "Loading map history...");
    this.loadLogs().then((data)=>{
      if(this.viewMode == 'map'){
        this.loadMap();
      }
      this.loader.dismiss();
    });
  }

  loadLogs(){
    return new Promise(resolve => {
      if(this.viewMode == 'history'){
        this.logsService.getLogsByTripId(this.skip, this.take, this.trip.Id).then((data: any[]) => {
          this.loadLogsList(data);
          resolve(true);
        }); 
      } else if(this.viewMode == 'map') {
        this.logsService.getAllLogsByTripId(this.trip.Id).then((data: any[]) => {
          this.loadLogsList(data);
          resolve(true);
        }); 
      } 
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
  
  delete(id){
    
    let prompt = this.alertCtrl.create({
      title: '¿Desea eliminar este registro?',
      message: "",
      buttons: [
        {
          text: 'No',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Si',
          handler: data => {
            this.showLoader("Eliminando registro...");
            this.logsService.delete(id, this.trip.Id).then(()=>{
              this.loader.dismiss();
              this.skip = 0;
              this.logs = [];
              this.showLoader("Obteniendo registros...");
              this.loadLogs().then(()=>this.loader.dismiss());
            });
          }
        }
      ]
    });
    prompt.present();
  }
  
  doInfinite(infiniteScroll:any) {
     this.skip+=this.take;
     this.loadLogs().then(()=>{
       infiniteScroll.complete();
     });
     
  }

  loadMap(){
    if(this.mapElement != undefined){
      if(this.logs.length > 0){
        let latLng = new google.maps.LatLng(+this.logs[0].position_lat, +this.logs[0].position_lng);
        let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          disableDefaultUI: false
        }
        this.tripMap = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        
        var bounds = new google.maps.LatLngBounds();

        var markers = new Array();
        var count = 0;
        this.logs.forEach(element => {
          count++;
          var lat = +element.position_lat;
          var lng = +element.position_lng;
          markers.push({lat: lat, lng: lng});
          var marker = new google.maps.Marker({
            position: {lat: lat, lng: lng},
            map: this.tripMap,
            title: element.title,
            label: count.toString()
          });
          bounds.extend(marker.getPosition());
          var infowindow = new google.maps.InfoWindow({
            content: "<h4>" + element.title + "</h4><br/>" + element.date.toLocaleString() + "<br/>" + element.message
          });
          marker.addListener('click', function() {
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
  }

  private loadLogsList(newLogs : any[]){
    var minutesOffset:number = new Date().getTimezoneOffset();
    for(let log of newLogs) {
      let newLog:Log = new Log(log.id, log.title, log.message, log.locationEnabled == 1 ? true : false, DateTimeHelper.getLocalDateFromUTC(log.date), log.latitude, log.longitude, log.hasImage == 1 ? true : false, log.image);
      newLog.userName = log.username != undefined ? log.username : log.name;
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
