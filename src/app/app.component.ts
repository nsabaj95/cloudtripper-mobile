import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { NativeStorage } from 'ionic-native';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TripsPage } from '../pages/trips/trips';
import { NewsPage } from '../pages/news/news';
import { UsersPage } from '../pages/users/users';
import {UsersService} from '../providers/users-service';
import {TripsSubscriptionsService} from '../providers/trips-subscriptions-service';

import { BackgroundMode, LocalNotifications, Badge } from 'ionic-native';


@Component({
  templateUrl: 'app.html',
  providers:[TripsSubscriptionsService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  usersService:any = UsersService;
  pages: Array<{title: string, component: any, icon: string}>;
  tripsSubscriptions:any = TripsSubscriptionsService;

  constructor(public platform: Platform, public tripsSubscriptionsService: TripsSubscriptionsService) {
    // Splashscreen.show();
    
    this.initializeApp(tripsSubscriptionsService);

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Mi perfil', component: HomePage, icon:"contact" },
      { title: 'Novedades', component: NewsPage, icon:"globe" },
      { title: 'Viajes', component: TripsPage, icon:"briefcase" },
      { title: 'Usuarios', component: UsersPage, icon:"people" },
    ];

  }

  initializeApp(tripsSubscriptionsService) {
      this.usersService = UsersService;
      this.platform.ready().then(() => {
      
      BackgroundMode.configure({
        silent:true
      });
      BackgroundMode.enable();
      Badge.registerPermission();
      console.log(Badge.hasPermission());
      this.startGettingNews(tripsSubscriptionsService);
      StatusBar.styleDefault();
      this.hideSplashScreen();
    });
  }

  startGettingNews(tripsSubscriptionsService){
    setInterval(function(){
      // console.log(Badge.hasPermission());
      if(UsersService.currentUser != null){
        var fromDate = UsersService.currentUser.lastUpdate;
        // var lastUpdate = moment(new Date().toLocaleString(), "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
        tripsSubscriptionsService.getNumberOfNews(fromDate, UsersService.currentUser.id)
          .then((data)=>{
            if(TripsSubscriptionsService.numberOfNews != data){
              TripsSubscriptionsService.numberOfNews=data;
              Badge.set(data);
              if(TripsSubscriptionsService.numberOfNews > 0) {
                if(LocalNotifications.isPresent(1)){
                  LocalNotifications.get(1).then((notif) =>{
                    notif.text = data + " novedades";
                    LocalNotifications.update(notif);
                  })
                }
                LocalNotifications.schedule({
                  id: 1,
                  text: data + " novedades",
                  sound: 'file://sound.mp3',
                  icon: "icon",
                  smallIcon: "icon"
                });
                LocalNotifications.on("click", (notification, state) => {
                  this.openPage(NewsPage);
                });
              }
            }
            console.log("New refresh: "  + data);
           });
      }
    }, 60000);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  signOut() {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    NativeStorage.remove('login').then(response => this.nav.setRoot(LoginPage), error => this.nav.setRoot(LoginPage));
  }

  hideSplashScreen() {
    if (Splashscreen) {
        setTimeout(() => {
            Splashscreen.hide();
        }, 100);
    }
  }
}
