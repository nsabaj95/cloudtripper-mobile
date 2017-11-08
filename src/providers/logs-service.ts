import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Transfer } from 'ionic-native';
import { AlertController } from 'ionic-angular';
import { Connection } from '../providers/connection';
import 'rxjs/add/operator/map';

@Injectable()
export class LogsService {
  // apiurl:string = 'http://192.168.1.12:8000/api';
  apiurl: string;
  constructor(public http: Http, public alertCtrl: AlertController) {
    this.apiurl = Connection.getUrl("logs");
  }

  handleError(error) {
    console.log(error);
    return error.json().message || 'Server error, please try again later';
  }

  getAllLogs() {
    return this.getLogs("");
  }
  getAllLogsByTripId(trip_id) {
    return this.getLogs('?trip_id=' + encodeURIComponent(trip_id));
  }
  getLogsByTripId(skip, take, trip_id) {
    return this.getLogs('?skip=' + encodeURIComponent(skip) + '&take=' + encodeURIComponent(take) + '&trip_id=' + encodeURIComponent(trip_id));
  }
  getLogsBySubscriptorId(skip, take, subscriptor_id, updateDate) {
    return this.getLogs('?skip=' + encodeURIComponent(skip) + '&take=' + encodeURIComponent(take) + '&subscriptor_id=' + encodeURIComponent(subscriptor_id) + '&updateDate=' + encodeURIComponent(updateDate));
  }

  uploadImage(title, message, positionEnabled, lat, lng, date, imgUrl, trip_id, address) {
    let ft = new Transfer();
    let filename = "img.jpg";
    let fileOptions = {
      fileKey: 'file',
      fileName: filename,
      mimeType: 'image/jpeg',
      chunkedMode: false,
      headers: {
        'Content-Type': undefined
      },
      params: {
        fileName: filename,
        title: title,
        message: message,
        positionEnabled: positionEnabled,
        latitude: lat,
        longitude: lng,
        trip_id: trip_id,
        date: date,
        address: address
      }
    };
    return new Promise(resolve => {
      ft.upload(imgUrl, this.apiurl, fileOptions, false)
        .then((result: any) => {
          console.log(result);
          resolve(result);
        }).catch((error: any) => {
          console.log(error);
          let alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: error,
            buttons: ['OK']
          });
          alert.present();
        });
    });

  }

  onProgress() {
    console.log('cargando');
  }

  addLog(title, message, positionEnabled, lat, lng, date, imgUrl, trip_id, address) {
    lng = lng.replace(",", ".");
    lat = lat.replace(",", ".")
    if (imgUrl != undefined) {
      return this.uploadImage(title, message, positionEnabled, lat, lng, date, imgUrl, trip_id, address);
    } else {
      var data = JSON.stringify({ title: title, message: message, positionEnabled: positionEnabled, date: date, latitude: lat, longitude: lng, trip_id: trip_id, address: address });
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
  delete(id, trip_id){
    return new Promise(resolve => {
        this.http.delete(this.apiurl + "?id=" + id + "&trip_id=" + trip_id)
        .map(res => res.json())
        .subscribe(data => {
         resolve(data);
        }, error => {
            console.log(error);
        });
    });
  }
  private getLogs(data){
    let link = this.apiurl + data;
    return new Promise(resolve => {
      this.http.get(link)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.data);
        }, error => {
          console.log("Oooops!");
        });
    });
  }
}
