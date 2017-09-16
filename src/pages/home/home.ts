import { Component} from '@angular/core';
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
// import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
// declare var google;

@Component({
  templateUrl: 'home.html',
  providers: [TripsService,UsersService,LogsService]
})
export class HomePage {
  trips:Trip[] = [];
  user:any;
  loader:any;
  defaultUrlImage;
  tripsSubscriptionsService = TripsSubscriptionsService;
  // @ViewChild('map') mapElement: ElementRef;
  // map: any;
  // selectedLog: Log;
  // showMaps: boolean = false;
  // public base64Image : string;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController, public logsService: LogsService, public tripsService: TripsService, public usersService: UsersService, public navParams: NavParams, public loadingCtrl: LoadingController) {
    this.user = UsersService.currentUser;
    this.defaultUrlImage = "../../assets/images/trip-default2.jpg";
  }

  ionViewDidLoad(){
    this.loadTrips();
  }

  loadTrips(){
    this.loader = this.loadingCtrl.create({
      content: "Getting trips..."
    });
    this.loader.present();
    return new Promise(resolve => {
      this.tripsService.getAllTripsByUser(UsersService.currentUser.id).then((trips : any[]) => {
        console.log(trips);
        for(let t of trips) {
          let trip:Trip = new Trip(t.id, t.active, t.destination, t.origin, new Date(t.startDate), new Date(t.endDate), new Date(t.lastUpdate), t.numberOfLogs, t.user_id, t.hasImage, t.image, t.numberOfSubscriptions);
          this.trips.push(trip);
        }
        this.loader.dismiss();
        resolve(true);
      }); 
    });
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
  
  addLog(trip_id){
    this.navCtrl.push(LogYourMomentPage, {
      trip_id: trip_id
    });
  }
  addTrip(){
    this.navCtrl.push(NewTripPage);
  }
  
  deleteTrip(id) {
    let prompt = this.alertCtrl.create({
      title: 'Are you sure you want to delete this trip?',
      message: "",
      buttons: [
        {
          text: 'No',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Yes',
          handler: data => {
            this.showLoader("Deleting trip...");
            this.tripsService.delete(id).then(()=>{
              this.loader.dismiss();
              this.trips = [];
              this.loadTrips();
            });
          }
        }
      ]
    });
    prompt.present();
  }
  private showLoader(message){
    this.loader = this.loadingCtrl.create({
      content: message
    });
    this.loader.present();
  }
}
