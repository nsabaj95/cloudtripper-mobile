import { Component} from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import {PhotoViewer} from 'ionic-native';

@Component({
  templateUrl: 'photo-showroom.html'
})
export class PhotoShowroomPage {
  images:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, sanitizier:DomSanitizer) {
    // If we navigated to this page, we will have an item available as a nav param
    this.images = navParams.get('images');
  }

  ionViewDidEnter(){
  }

  showPhoto(image){
    PhotoViewer.show(image);
  }
}
