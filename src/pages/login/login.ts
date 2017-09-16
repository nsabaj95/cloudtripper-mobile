import { Component } from '@angular/core';
import { NavController,LoadingController, AlertController, Platform } from 'ionic-angular';
import {UsersService} from '../../providers/users-service';
import {FacebookService} from '../../providers/facebook-service';
import {TripsSubscriptionsService} from '../../providers/trips-subscriptions-service';
import {User} from '../../models/user';
import {HomePage} from '../home/home';
import {RegisterPage} from '../register/register';
import { NativeStorage, Badge } from 'ionic-native';

//https://ionicthemes.com/tutorials/about/ionic2-facebook-login

@Component({
  templateUrl: 'login.html',
  providers: [UsersService,TripsSubscriptionsService,FacebookService]
})
export class LoginPage {
  data : User;
  loader:any;
  rememberMe: boolean;
  
  constructor(public fbService : FacebookService, public navCtrl: NavController, public platform: Platform, public usersService: UsersService, public loadingCtrl: LoadingController, public alertCtrl: AlertController, public tripsSubscriptionsService: TripsSubscriptionsService) {
    this.data = new User("", "", "", "", "", "", "");
    
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      NativeStorage.getItem('login')
      .then(
        user => { 
          console.log("stored login")
          console.log(user);
          this.loader = this.loadingCtrl.create({
            content: "Ingresando..."
          });
          this.data = new User(user.username, user.password, user.id, user.lastUpdate, user.facebookid, user.avatar, user.name);
          this.login(this.data);
        },
        error => {
          console.error(error);
        } 
      );
    });
    
  }
  register(){
    this.navCtrl.push(RegisterPage);
  }
  facebookLogin(){
    this.rememberMe = true;
    this.fbService.login()
      .then((response) => {
      this.loader = this.loadingCtrl.create({
        content: "Ingresando..."
      });
      this.loader.present();
      let facebookid = response.authResponse.userID;
      let params = new Array();
      
      this.fbService.getUser(params)
        .then((user) => {
          user.picture = "https://graph.facebook.com/" + facebookid + "/picture?type=square";
          this.usersService.facebookLogin(facebookid).then((u:User) => {
            console.log(u);
            if(u == undefined){
              this.usersService.facebookRegister(user.picture, facebookid, user.name).then((id)=>{
                console.log("Registering facebook user...");
                console.log(id);
                u = new User("", "", id, "", facebookid, user.picture, user.name);
                this.login(u);
              });
            }else{
              u.avatar = user.picture;
              this.login(u);
            }
          });
        })
      }, function(error){
        let alert = this.alertCtrl.create({
          title: 'Error de autenticación.',
          subTitle: 'Se ha producido un error al intentar iniciar sesión con facebook.',
          buttons: ['OK']
        });
        alert.present();
        console.log(error);
      });
  }
  
  defaultLogin(){
    this.loader = this.loadingCtrl.create({
      content: "Ingresando..."
    });
    this.loader.present();
    let username = this.data.username;
    let password = this.data.password;
    this.usersService.defaultLogin(username, password).then((user:User) => {
      if(user == undefined){
        this.loader.dismiss();
        let alert = this.alertCtrl.create({
          title: 'Error de autenticación.',
          subTitle: 'Usuario o contraseña son incorrectos.',
          buttons: ['OK']
        });
        alert.present();
      }else{
        this.login(user);
      }
    });
  }

  private login(user){
    console.log("Logging user...");
    console.log(user);
    UsersService.currentUser = user;
    this.data = user;

    if(this.rememberLogin){
      this.rememberLogin();
    }

    this.tripsSubscriptionsService.getNumberOfNews(UsersService.currentUser.lastUpdate, UsersService.currentUser.id)
      .then((data)=>{
        TripsSubscriptionsService.numberOfNews=data;
        console.log("News at login time: " + TripsSubscriptionsService.numberOfNews);
        Badge.set(TripsSubscriptionsService.numberOfNews);
        this.loader.dismiss();
        this.navCtrl.setRoot(HomePage);
      });
  }

  private rememberLogin(){
    NativeStorage.setItem('login', this.data)
        .then(
          response => { 
            console.log('Stored item!');
          },
          error => console.error('Error storing item', error)
        );
  }
}
