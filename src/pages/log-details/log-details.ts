import { Component, ViewChild, ElementRef} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {Log} from '../../models/log';
import { DomSanitizer } from '@angular/platform-browser';
import {PhotoViewer} from 'ionic-native';

declare var google;

@Component({
  templateUrl: 'log-details.html'
})
export class LogDetailsPage {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  selectedLog: Log;
  showMaps: boolean = false;
  public base64Image : string;
  constructor(public navCtrl: NavController, public navParams: NavParams, sanitizier:DomSanitizer) {
    // If we navigated to this page, we will have an item available as a nav param
    this.selectedLog = navParams.get('selectedLog');
    this.showMaps = true;
    this.base64Image = this.selectedLog.image;
  }

  ionViewDidEnter(){
    this.loadMap();
  }

  showPhoto(log : Log){
    PhotoViewer.show(log.image, log.title);
  }

  loadMap(){
    if(this.mapElement != undefined){
      let latLng = new google.maps.LatLng(this.selectedLog.position_lat, this.selectedLog.position_lng);
      let mapOptions = {
        center: latLng,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true
      }
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
      var marker = new google.maps.Marker({
        position: latLng,
        title: 'new marker',
        draggable: true,
        map: this.map
      });
      this.map.setCenter(marker.getPosition())    
    }
  }
}
