import {Component} from '@angular/core';
import {NavController, NavParams,LoadingController} from 'ionic-angular';
import {UsersService} from '../../providers/users-service';
import {User} from '../../models/user';
import {UserPage} from '../user/user';

declare var google;

@Component({
  templateUrl: 'users.html',
  providers: [UsersService]
})
export class UsersPage {
  users:User[] = [];
  take:number = 10;
  skip:number = 0;
  loader:any;
  constructor(public navCtrl: NavController, public usersService: UsersService, public navParams: NavParams, public loadingCtrl: LoadingController) {
    
  }

  ionViewDidLoad(){
    this.loader = this.loadingCtrl.create({
      content: "Obteniendo usuarios..."
    });
    this.loader.present();
    this.loadUsers().then(()=>{
      this.loader.dismiss();
    });
  }

  loadUsers(){
    return new Promise(resolve => {
      this.usersService.getAll(this.skip, this.take).then((data:any) => {
        // var users = Object.keys(data).map(function(k) { return data[k] })[1];
        var users = data.data;
        for(let u of users) {
          this.users.push(new User(u.username, "", u.id, u.lastupdate, u.facebookid, u.hasavatar == "1" ? u.avatar : "img/avatar.png", u.name));
          console.log(this.users);
        }
        resolve();
      });
    });
  }

  refreshUsers(refresher){
    this.skip = 0;
    this.users = [];
    this.loadUsers().then(()=>{
      refresher.complete();
    });
  }

  showUser(user) {
    this.navCtrl.push(UserPage, {
      user: user
    });
  }

  doInfinite(infiniteScroll:any) {
     this.skip+=this.take;
     this.loadUsers().then(()=>{
       infiniteScroll.complete();
     });
  }

  // showMap(trip_id){
  //   this.navCtrl.push(TripMapPage, {
  //     trip_id: trip_id
  //   });
  // }
  // private showLoader(message){
  //   this.loader = this.loadingCtrl.create({
  //     content: message
  //   });
  //   this.loader.present();
  // }
}
