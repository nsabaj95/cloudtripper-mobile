import moment from 'moment';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import {Transfer} from 'ionic-native';
import { AlertController } from 'ionic-angular';
import {User} from '../models/user';
import {Observable} from 'rxjs/Observable';
import { Connection } from '../providers/connection';
import { TripsSubscriptionsService } from '../providers/trips-subscriptions-service';

@Injectable()
export class UsersService {
  // apiurl:string = 'http://192.168.1.12:8000/api';
  static currentUser: User;
  apiurl:string;
  constructor(public http: Http, public alertCtrl: AlertController) {
    this.apiurl = Connection.getUrl("users");
  }

  handleError(error) {
      console.log(error);
      return error.json().message || 'Server error, please try again later';
  }
  
  defaultLogin(username, password){
    let data = '?username=' + username + '&password=' + password;
    return this.login(data);
  }

  facebookLogin(facebookid){
    let data = '?facebookid=' + facebookid;
    return this.login(data);
  }

  getAll(skip, take) {
    let link = this.apiurl + '?skip=' + encodeURIComponent(skip) + '&take=' + encodeURIComponent(take);
    return new Promise(resolve => {
      this.http.get(link)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data.error);
        }, error => {
          console.log(error);
        });
    });
  }

  defaultRegister(username, password) {
    var data = JSON.stringify({username:username,password:password, avatar:"", facebookid:"", name:"", action: "register"});
    return this.register(data);
  }

  facebookRegister(avatar, facebookid, name){
    var data = JSON.stringify({username:"",password:"", avatar, facebookid, name, action: "register"});
    return this.register(data);
  }

  private register(data){
    return new Promise(resolve => {
      this.http.post(this.apiurl, data)
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, error => {
          resolve(error);
        });
    });
  }

  update(id, text){
    var data = JSON.stringify({id, text});
    return new Promise(resolve => {
      this.http.put(this.apiurl, data)
        .subscribe(data => {
          resolve(true);
        }, error => {
          console.log("ERROR!: ", error);
          resolve(false);
        });
    });
    // }
  }

  getUser(id){
    let data = JSON.stringify({id});
    return new Promise(resolve => {
      this.http.post(this.apiurl, data)
        .map(res => res.json())
        .subscribe(data => {
          if(data.error)
            resolve(false);
          else
            resolve(true);
        }, error => {
            console.log("Oooops!");
        });
    });
  }

  private login(data){
    var link = this.apiurl + data;
    return new Promise(resolve => {
      this.http.get(link)
        .map(res => res.json())
        .subscribe(result => {
          if(result.success)
          {
            var user = result.data;
            UsersService.currentUser = new User(user.username, user.password, user.id, user.lastupdate, user.facebookid, user.avatar, user.name);
            TripsSubscriptionsService.numberOfNews = 0;
            var minutesOffset:number = new Date().getTimezoneOffset();
            var date = moment(user.lastupdate).add(-minutesOffset, "minutes").format("YYYY-MM-DD HH:mm:ss");
            TripsSubscriptionsService.lastUpdate = date;
            resolve(UsersService.currentUser);
          } else {
            resolve(undefined);
          }
        }, error => {
            console.log("Oooops!");
            resolve(error);
        });
    });
  }
}
