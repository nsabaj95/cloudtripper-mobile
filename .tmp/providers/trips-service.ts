import moment from 'moment';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Transfer} from 'ionic-native';
import { AlertController } from 'ionic-angular';
import { Connection } from '../providers/connection';

import 'rxjs/add/operator/map';

@Injectable()
export class TripsService {
  // apiurl:string = 'http://192.168.1.12:8000/api';
  apiurl:string;
  constructor(public http: Http, public alertCtrl: AlertController) {
    this.apiurl = Connection.getUrl("trips");
  }

  handleError(error) {
      console.log(error);
      return error.json().message || 'Server error, please try again later';
  }

  getAllTripsByUser(user_id) {
     let link = this.apiurl + '?user_id=' + encodeURIComponent(user_id);
     console.log(user_id);
      return this.get(link);
  }
  getAllTripsBySubscriptor(user_id) {
     let link = this.apiurl + '?subscriptor_id=' + encodeURIComponent(user_id);
     console.log(link);
    return this.get(link);
  }
  getTrips(skip, take) {
    let link = this.apiurl + '?skip=' + encodeURIComponent(skip) + '&take=' + encodeURIComponent(take);
    return this.get(link);
  }
  getTripsByUser(skip, take, user_id) {
    let link = this.apiurl + '?skip=' + encodeURIComponent(skip) + '&take=' + encodeURIComponent(take) + '&user_id=' + encodeURIComponent(user_id);
    return this.get(link);
  }
  getTripsBySubscriptor(skip, take, subscriptor_id) {
    let link = this.apiurl + '?skip=' + encodeURIComponent(skip) + '&take=' + encodeURIComponent(take) + '&subscriptor_id=' + encodeURIComponent(subscriptor_id);
    return this.get(link);
  }
  uploadImage(origin, destination, startDate, endDate, user_id, imgUrl, lastUpdate){
    let ft = new Transfer();
    let filename = "img.jpg";
    let fileOptions = {
        fileKey: 'file',
        fileName: filename,
        mimeType: 'image/jpeg',
        chunkedMode: false,
        headers: {
            'Content-Type' : undefined
        },
        params: {
            fileName: filename,
            origin: origin,
            destination: destination,
            startDate: startDate,
            endDate: endDate,
            user_id: user_id,
            lastUpdate: lastUpdate
        }
    }; 
    // ft.onProgress(this.onProgress);
    return new Promise(resolve => {
      ft.upload(imgUrl, this.apiurl, fileOptions, false)
        .then((result: any) => {
          // let alert = this.alertCtrl.create({
          //   title: 'Uploaded!',
          //   subTitle: result,
          //   buttons: ['OK']
          // });
          // alert.present();
            // this.success(result);
          resolve(result);
        }).catch((error: any) => {
          let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: error,
            buttons: ['OK']
          });
          alert.present();
        });
    });
  }
  
  addTrip (origin, destination, startDate, endDate, user_id, imgUrl) {
    var lastUpdate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    
    if(imgUrl != undefined){
      return this.uploadImage(origin, destination, startDate, endDate, user_id, imgUrl, lastUpdate);
    }else{
      var data = JSON.stringify({origin: origin, destination: destination, startDate: startDate, endDate:endDate, user_id: user_id, lastUpdate: lastUpdate});
      return new Promise(resolve => {
        this.http.post(this.apiurl, data)
          .subscribe(data => {
            resolve(data);
          }, error => {
              console.log("ERROR!: ", error);
          });
      });
      
    }
  }

  public delete(id){
    return new Promise(resolve => {
        this.http.delete(this.apiurl + "?id=" + id)
        .map(res => res.json())
        .subscribe(data => {
         resolve(data);
        }, error => {
            console.log("Oooops!");
        });
    });
  }

  private get(link){
    return new Promise(resolve => {
        this.http.get(link)
        .map(res => res.json())
        .subscribe(data => {
          console.log("Getting trips...");
          console.log(data);
         resolve(data.data);
        }, error => {
            console.log("Oooops!");
        });
    });
  }
}
