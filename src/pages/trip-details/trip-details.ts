import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import {Trip} from '../../models/trip';
import {User} from '../../models/user';
import {LogsService} from '../../providers/logs-service';
import { DomSanitizer } from '@angular/platform-browser';
import {TripsSubscriptionsService} from '../../providers/trips-subscriptions-service';
import {PhotoShowroomPage} from '../photo-showroom/photo-showroom';
declare var google;

@Component({
  templateUrl: 'trip-details.html',
  providers:[LogsService]

})
export class TripDetailsPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  selectedTrip: Trip;
  showMaps: boolean = false;
  subscriptors:any = [];
  loader:any;
  public base64Image : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, public logsService : LogsService, sanitizier:DomSanitizer, public tripsSubscriptionsService : TripsSubscriptionsService, public loadingCtrl: LoadingController) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedTrip = navParams.get('selectedTrip');
    this.base64Image = this.selectedTrip.Image;
  }

  ionViewDidEnter(){
    console.log(this.selectedTrip.Id);
    this.tripsSubscriptionsService.getSubscriptions(this.selectedTrip.Id).then((data)=>{
      var users = Object.keys(data).map(function(k) { return data[k] });
        for(let u of users) {
          console.log(u);
          this.subscriptors.push(new User(u.UserName, "", u.Text, u.Id, u.LastUpdate, u.hasAvatar, u.HasAvatar == "1" ? u.Avatar : "img/avatar.png"));
        }
    });
  }
  showTripPhotos(){
    this.showLoader("Getting trip photos...");
    var images = [];
    this.logsService.getAllLogsByTripId(this.selectedTrip.Id).then((data: any[])=>{
      console.log(data);
      for(let log of data) {
        images.push(log.image);
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
  // loadMap(){
  //   if(this.mapElement != undefined){
  //     let latLng = new google.maps.LatLng(this.selectedLog.position_lat, this.selectedLog.position_lng);
  //     let mapOptions = {
  //       center: latLng,
  //       zoom: 15,
  //       mapTypeId: google.maps.MapTypeId.ROADMAP,
  //       disableDefaultUI: true
  //     }
  //     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
  //     var marker = new google.maps.Marker({
  //       position: latLng,
  //       title: 'new marker',
  //       draggable: true,
  //       map: this.map
  //     });
  //     this.map.setCenter(marker.getPosition())    
  //   }
  // }
}
