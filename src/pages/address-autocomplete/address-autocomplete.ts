import {Component, NgZone} from '@angular/core';
import {ViewController} from 'ionic-angular';

declare var google;

@Component({
  templateUrl: 'address-autocomplete.html',
  // providers: [LogsService]
})


export class AddressAutocompletePage {
  autocompleteItems;
  autocomplete;

  latitude: number = 0;
  longitude: number = 0;
  geo: any

  service = new google.maps.places.AutocompleteService();

  constructor (public viewCtrl: ViewController, private zone: NgZone) {
    this.autocompleteItems = [];
    this.autocomplete = {
      query: ''
    };
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.geo = item;

    let geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': this.geo }, (results, status) => {
      this.latitude = results[0].geometry.location.lat();
      this.longitude = results[0].geometry.location.lng();
      this.viewCtrl.dismiss({lat:this.latitude,lng:this.longitude,place:item});
    });
  }

  updateSearch() {
    if (this.autocomplete.query == '') {
      this.autocompleteItems = [];
      return;
    }
    let me = this;
    this.service.getPlacePredictions({ input: this.autocomplete.query /*,  componentRestrictions: {country: 'TH'}*/ }, function (predictions, status) {
      me.autocompleteItems = []; 
      me.zone.run(function () {
        predictions.forEach(function (prediction) {
          me.autocompleteItems.push(prediction.description);
        });
      });
    });
  }

  //convert Address string to lat and long
  geoCode(address:any) {
    
 }
}