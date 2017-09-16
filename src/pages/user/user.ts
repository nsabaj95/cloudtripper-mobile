import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import {TripsService} from '../../providers/trips-service';
import {LogsService} from '../../providers/logs-service';
import {UsersService} from '../../providers/users-service';
import {TripsSubscriptionsService} from '../../providers/trips-subscriptions-service';
import {Trip} from '../../models/trip';
import {LogHistoryPage} from '../log-history/log-history';
import {TripDetailsPage} from '../trip-details/trip-details';
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
    this.tripsService.getAllTripsBySubscriptor(UsersService.currentUser.id).then((data:any) => {
        var newTrips = data;
        for(let t of newTrips) {
          this.subscriptions.push(t.id);
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
      this.tripsService.getAllTripsByUser(this.user.id).then((data:any) => {
        var trips = data;
        console.log(trips);
        for(let t of trips) {
          let trip:Trip = new Trip(t.id, t.active, t.destination, t.origin, new Date(t.startDate), new Date(t.endDate), new Date(t.lastUpdate), t.numberOfLogs, t.user_Id, t.hasImage, t.hasImage == 1 ? t.image : "img/trip-default2.jpg", t.numberOfSubscriptions);
          trip.UserName = t.userName;
          if(this.isTripSubscribed(t.id))
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
    this.logsService.getAllLogsByTripId(trip_id).then((data:any)=>{
      var logs = data;
      for(let l of logs) {
        images.push(l.image);
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
