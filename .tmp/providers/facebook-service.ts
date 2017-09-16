import { Injectable } from '@angular/core';
import { Facebook, FacebookLoginResponse } from 'ionic-native';


@Injectable()
export class FacebookService {
  // apiurl:string = 'http://192.168.1.12:8000/api';
  constructor() {

  }
  login(){
    return Facebook.login(['public_profile', 'user_friends', 'email']);
  }
  getUser(params){
    return Facebook.api("/me?fields=name,gender", params);
  }
}
