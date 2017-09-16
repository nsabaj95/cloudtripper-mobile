import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import {TripsService} from '../../providers/trips-service';
import {LogsService} from '../../providers/logs-service';
import {UsersService} from '../../providers/users-service';
import {TripsSubscriptionsService} from '../../providers/trips-subscriptions-service';
import {Trip} from '../../models/trip';
import {LogHistoryPage} from '../log-history/log-history';
import {LogYourMomentPage} from '../log-your-moment/log-your-moment';
import {TripDetailsPage} from '../trip-details/trip-details';
import {NewTripPage} from '../new-trip/new-trip';
import {TripMapPage} from '../trip-map/trip-map';
import {PhotoShowroomPage} from '../photo-showroom/photo-showroom';
// import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
// declare var google;

@Component({
  templateUrl: 'user.html',
  providers: [TripsService,UsersService,LogsService]
})
export class UserPage {
  trips:Trip[] = [];
  user:any;
  loader:any;
  defaultUrlImage;
  subscriptions:any = [];
  tripsSubscriptionsService = TripsSubscriptionsService;
  // @ViewChild('map') mapElement: ElementRef;
  // map: any;
  // selectedLog: Log;
  // showMaps: boolean = false;
  // public base64Image : string;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public logsService: LogsService, public tripsService: TripsService, public usersService: UsersService, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.user = navParams.get('user');
    this.defaultUrlImage = "../../assets/images/trip-default2.jpg";
    this.tripsService.getAllTripsBySubscriptor(UsersService.currentUser.id).then(data => {
        var newTrips = Object.keys(data).map(function(k) { return data[k] })[1];
        for(let t of newTrips) {
          this.subscriptions.push(t.Id);
        }
      });
  }

  ionViewDidLoad(){
    this.loadTrips();
  }

  loadTrips(){
    this.loader = this.loadingCtrl.create({
      content: "Obteniendo viajes..."
    });
    this.loader.present();
    return new Promise(resolve => {
      this.tripsService.getAllTripsByUser(this.user.id).then(data => {
        var trips = Object.keys(data).map(function(k) { return data[k] })[1];
        console.log(trips);
        for(let t of trips) {
          let trip:Trip = new Trip(t.Id, t.Active, t.Destination, t.Origin, new Date(t.StartDate), new Date(t.EndDate), new Date(t.LastUpdate), t.NumberOfLogs, t.User_Id, t.HasImage, t.HasImage == 1 ? t.Image : "img/trip-default2.jpg", t.NumberOfSubscriptions);
          trip.UserName = t.UserName;
          if(this.isTripSubscribed(t.Id))
          {
            trip.Subscribed = true;
          }
          this.trips.push(trip);
        }
        console.log(this.trips);
        this.loader.dismiss();
        resolve(true);
      }); 
    });
  }
  showTripLogs(trip){
    if(trip.Subscribed){
      this.navCtrl.push(LogHistoryPage, {
        trip: trip
      });
    }
  }
  private isTripSubscribed(trip_id){
    var flag = false;
    var count = 0;
    while(!flag && count < this.subscriptions.length){
      if(this.subscriptions[count] == trip_id){
        flag = true;
      }
      count++;
    }
    return flag;
  }
  private loadTripsList(data){
    var newTrips = Object.keys(data).map(function(k) { return data[k] })[1];
    for(let t of newTrips) {
      let trip:Trip = new Trip(t.Id, t.Active, t.Destination, t.Origin, new Date(t.StartDate), new Date(t.EndDate), new Date(t.LastUpdate), t.NumberOfLogs, t.User_Id, t.HasImage, t.HasImage == 1 ? t.Image : "img/trip-default2.jpg", t.NumberOfSubscriptions);
      trip.UserName = t.UserName;
      if(this.isTripSubscribed(t.Id))
      {
        trip.Subscribed = true;
      }
      this.trips.push(trip);
    }
  }
  loadLogs(trip){
    this.navCtrl.push(LogHistoryPage, {
      trip: trip
    });
  }
  showMap(trip_id){
    this.navCtrl.push(TripMapPage, {
      trip_id: trip_id
    });
  }
  showTripDetails(selectedTrip){
    this.navCtrl.push(TripDetailsPage, {
      selectedTrip: selectedTrip
    });
  }
  showTripPhotos(trip_id){
    this.showLoader("Obteniendo imágenes...");
    var images = [];
    this.logsService.getAllLogsByTripId(trip_id).then((data)=>{
      var logs = Object.keys(data).map(function(k) { return data[k] })[1];
      for(let l of logs) {
        images.push(l.Image);
      }
      this.loader.dismiss();
      this.navCtrl.push(PhotoShowroomPage, {
        images: images
      });
    });
  }
  
  private showLoader(message){
    this.loader = this.loadingCtrl.create({
      content: message
    });
    this.loader.present();
  }
}
