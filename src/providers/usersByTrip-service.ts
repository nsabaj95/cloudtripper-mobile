import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { Connection } from '../providers/connection';
import 'rxjs/add/operator/map';

@Injectable()
export class UsersByTripService {
  // apiurl:string = 'http://192.168.1.12:8000/api';
  apiurl:string;
  static lastUpdate;
  static numberOfNews;
  constructor(public http: Http, public alertCtrl: AlertController) {
    this.apiurl = Connection.getUrl("usersByTrip");
  }

  handleError(error) {
      console.log(error);
      return error.json().message || 'Server error, please try again later';
  }
  addUserByTrip(user_id, trip_id){
    var data = JSON.stringify({user_id: user_id, trip_id: trip_id});
      console.log('Json data: ' + data);
      return new Promise(resolve => {
        this.http.post(this.apiurl, data)
          .subscribe(data => {
            console.log(data);
            resolve(data);
          }, error => {
              console.log("ERROR!: ", error);
          });
      });
  }
  removeUserByTrip(user_id, trip_id){
    let link = this.apiurl + '?user_id=' + encodeURIComponent(user_id) + '&trip_id=' + encodeURIComponent(trip_id);
    console.log(link);
    return new Promise(resolve => {
      this.http.delete(link)
        .subscribe(data => {
          console.log(data);
          resolve(data);
        }, error => {
            console.log("ERROR!: ", error);
        });
    });
  }
  getUsersByTrip(trip_id){
    return new Promise(resolve => {
      var url = this.apiurl + '?trip_id=' + trip_id;
      console.log(url);
      this.http.get(url)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.data);
        }, error => {
            console.log("ERROR!: ", error);
            resolve(error);
        });
    });
  }
}
