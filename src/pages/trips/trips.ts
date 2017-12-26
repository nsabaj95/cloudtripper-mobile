import {Component} from '@angular/core';
import {NavController, NavParams,LoadingController} from 'ionic-angular';
import {TripsService} from '../../providers/trips-service';
import {TripsSubscriptionsService} from '../../providers/trips-subscriptions-service';
import {UsersService} from '../../providers/users-service';
import {LogsService} from '../../providers/logs-service';
import {Trip} from '../../models/trip';
import {User} from '../../models/user';
import {TripDetailsPage} from '../trip-details/trip-details';
import {TripMapPage} from '../trip-map/trip-map';
import {LogHistoryPage} from '../log-history/log-history';
import {PhotoShowroomPage} from '../photo-showroom/photo-showroom';

declare var google;

@Component({
  templateUrl: 'trips.html',
  providers: [TripsService,TripsSubscriptionsService,LogsService]
})
export class TripsPage {
  trips:Trip[] = [];
  subscriptions:number[] = [];
  take:number = 10;
  skip:number = 0;
  listType = "subscriptions";
  numberOfSubscriptions:number = 0;
  loader:any;
  trip_id:any;
  constructor(public navCtrl: NavController, public logsService: LogsService, public tripsSubscriptionsService : TripsSubscriptionsService, public navParams: NavParams, public loadingCtrl: LoadingController, public tripsService: TripsService) {
    this.trip_id = navParams.get('trip_id');
    this.tripsService.getAllTripsBySubscriptor(UsersService.currentUser.id).then((data:any) => {
        var newTrips = data;
        for(let t of newTrips) {
          this.numberOfSubscriptions++;
          this.subscriptions.push(t.id);
        }
      });
  }

  ionViewDidLoad(){
    this.loader = this.loadingCtrl.create({
      content: "Getting trips..."
    });
    this.loader.present();
    this.loadTrips().then(()=>{
      this.loader.dismiss();
    });
  }
  switchListType(listType){
    this.setDefaultListValues();
    this.listType = listType;
    this.loader = this.loadingCtrl.create({
      content: "Getting trips..."
    });
    this.loader.present();
    this.loadTrips().then(()=>{
      this.loader.dismiss();
    });
  }
  loadTrips(){
    return new Promise(resolve => {
      switch(this.listType){
        case "all":
          this.tripsService.getTrips(this.skip, this.take).then(data => {
              this.loadTripsList(data);
              resolve(true);
          });
          break;
        case "subscriptions":
          this.tripsService.getTripsBySubscriptor(this.skip, this.take, UsersService.currentUser.id).then(data => {
              this.loadTripsList(data);
              resolve(true);
          });
          break;
      }
    });
  }

  subscribe(trip:Trip){
    this.numberOfSubscriptions++;
    trip.NumberOfSubscriptions++;
    this.subscriptions.push(trip.Id);
    trip.Subscribed = true;
    var user_id = UsersService.currentUser.id;
    this.tripsSubscriptionsService.subscribe(user_id,trip.Id);
  }
  unsubscribe(trip:Trip){
    this.numberOfSubscriptions--;
    trip.NumberOfSubscriptions--;
    var index = this.subscriptions.indexOf(trip.Id, 0);
    if (index > -1) {
      this.subscriptions.splice(index, 1);
    }
    trip.Subscribed = false;
    if(this.listType == "subscriptions"){
      var index = this.trips.indexOf(trip, 0);
      if (index > -1) {
        this.trips.splice(index, 1);
      }
    }
    var user_id = UsersService.currentUser.id;
    this.tripsSubscriptionsService.unsubscribe(user_id,trip.Id);
  }
  refreshTrips(refresher){
    this.skip = 0;
    this.trips = [];
    this.loadTrips().then(()=>{
      refresher.complete();
    });
  }

  // logTapped(event, item) {
  //   this.navCtrl.push(LogDetailsPage, {
  //     selectedLog: item
  //   });
  // }

  doInfinite(infiniteScroll:any) {
     this.skip+=this.take;
     this.loadTrips().then(()=>{
       infiniteScroll.complete();
     });
  }
private isTripSubscribed(trip_id){
    var flag = false;
    var count = 0;
    console.log(trip_id);
    while(!flag && count < this.subscriptions.length){
      if(this.subscriptions[count] == trip_id){
        console.log(this.subscriptions[count]);
        flag = true;
      }
      count++;
    }
    return flag;
  }
  private loadTripsList(newTrips){
    for(let t of newTrips) {
      let user:User = new User(t.username, undefined, undefined, undefined, undefined, undefined, t.name);
      let trip:Trip = new Trip(t.id, t.active, t.destination, t.origin, new Date(t.startDate), new Date(t.endDate), new Date(t.lastUpdate), t.numberOfLogs, t.user_id, t.hasImage, t.image, t.numberOfSubscriptions, user);
      if(this.listType == "subscriptions" || this.isTripSubscribed(t.id))
      {
        trip.Subscribed = true;
      }
      this.trips.push(trip);
    }
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
  showTripLogs(trip){
    if(trip.Subscribed){
      this.navCtrl.push(LogHistoryPage, {
        trip: trip
      });
    }
  }
  showTripPhotos(trip_id){
    this.showLoader("Getting trip photos...");
    var images = [];
    this.logsService.getAllLogsByTripId(trip_id, true).then((data)=>{
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
  

  
  private setDefaultListValues(){
    this.trips = [];
    this.take = 10;
    this.skip = 0;
  }
  private showLoader(message){
    this.loader = this.loadingCtrl.create({
      content: message
    });
    this.loader.present();
  }
}
