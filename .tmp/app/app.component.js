import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { NativeStorage } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { TripsPage } from '../pages/trips/trips';
import { NewsPage } from '../pages/news/news';
import { UsersPage } from '../pages/users/users';
import { UsersService } from '../providers/users-service';
import { TripsSubscriptionsService } from '../providers/trips-subscriptions-service';
import { BackgroundMode, LocalNotifications, Badge } from 'ionic-native';
export var MyApp = (function () {
    function MyApp(platform, tripsSubscriptionsService) {
        // Splashscreen.show();
        this.platform = platform;
        this.tripsSubscriptionsService = tripsSubscriptionsService;
        this.rootPage = LoginPage;
        this.usersService = UsersService;
        this.tripsSubscriptions = TripsSubscriptionsService;
        this.initializeApp(tripsSubscriptionsService);
        // used for an example of ngFor and navigation
        this.pages = [
            { title: 'Mi perfil', component: HomePage, icon: "contact" },
            { title: 'Novedades', component: NewsPage, icon: "globe" },
            { title: 'Viajes', component: TripsPage, icon: "briefcase" },
            { title: 'Usuarios', component: UsersPage, icon: "people" },
        ];
    }
    MyApp.prototype.initializeApp = function (tripsSubscriptionsService) {
        var _this = this;
        this.usersService = UsersService;
        this.platform.ready().then(function () {
            // this.tripsSubscriptionsService.startRefreshing();
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            // NativeStorage.getItem('login')
            // .then(
            //   data => { 
            //     console.log("loaded username: " + data);
            //     UsersService.currentUser = new User(data.username, data.password, data.id);
            //   },
            //   error => console.error(error)
            // );
            BackgroundMode.setDefaults({
                title: "Cloudtripper en modo background",
                text: "No cierre la aplicación, y le llegarán notificaciones si hay novedades!"
            });
            BackgroundMode.enable();
            Badge.registerPermission();
            console.log(Badge.hasPermission());
            _this.startGettingNews(tripsSubscriptionsService);
            StatusBar.styleDefault();
            _this.hideSplashScreen();
        });
    };
    MyApp.prototype.startGettingNews = function (tripsSubscriptionsService) {
        setInterval(function () {
            var _this = this;
            // console.log(Badge.hasPermission());
            if (UsersService.currentUser != null) {
                var fromDate = UsersService.currentUser.lastUpdate;
                // var lastUpdate = moment(new Date().toLocaleString(), "DD/MM/YYYY HH:mm:ss").format("YYYY-MM-DD HH:mm:ss");
                tripsSubscriptionsService.getNumberOfNews(fromDate, UsersService.currentUser.id)
                    .then(function (data) {
                    if (TripsSubscriptionsService.numberOfNews != data) {
                        TripsSubscriptionsService.numberOfNews = data;
                        Badge.set(data);
                        if (TripsSubscriptionsService.numberOfNews > 0) {
                            if (LocalNotifications.isPresent(1)) {
                                LocalNotifications.get(1).then(function (notif) {
                                    notif.text = data + " novedades";
                                    LocalNotifications.update(notif);
                                });
                            }
                            LocalNotifications.schedule({
                                id: 1,
                                text: data + " novedades",
                                sound: 'file://sound.mp3',
                                icon: "icon",
                                smallIcon: "icon"
                            });
                            LocalNotifications.on("click", function (notification, state) {
                                _this.openPage(NewsPage);
                            });
                        }
                    }
                    console.log("New refresh: " + data);
                });
            }
        }, 60000);
    };
    MyApp.prototype.openPage = function (page) {
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        this.nav.setRoot(page.component);
    };
    MyApp.prototype.signOut = function () {
        var _this = this;
        // Reset the content nav to have just this page
        // we wouldn't want the back button to show in this scenario
        NativeStorage.remove('login').then(function (response) { return _this.nav.setRoot(LoginPage); }, function (error) { return _this.nav.setRoot(LoginPage); });
    };
    MyApp.prototype.hideSplashScreen = function () {
        if (Splashscreen) {
            setTimeout(function () {
                Splashscreen.hide();
            }, 100);
        }
    };
    MyApp.decorators = [
        { type: Component, args: [{
                    templateUrl: 'app.html',
                    providers: [TripsSubscriptionsService]
                },] },
    ];
    /** @nocollapse */
    MyApp.ctorParameters = [
        { type: Platform, },
        { type: TripsSubscriptionsService, },
    ];
    MyApp.propDecorators = {
        'nav': [{ type: ViewChild, args: [Nav,] },],
    };
    return MyApp;
}());
