import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { UsersService } from '../../providers/users-service';
import { FacebookService } from '../../providers/facebook-service';
import { TripsSubscriptionsService } from '../../providers/trips-subscriptions-service';
import { User } from '../../models/user';
import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { NativeStorage, Badge } from 'ionic-native';
//https://ionicthemes.com/tutorials/about/ionic2-facebook-login
export var LoginPage = (function () {
    function LoginPage(fbService, navCtrl, platform, usersService, loadingCtrl, alertCtrl, tripsSubscriptionsService) {
        var _this = this;
        this.fbService = fbService;
        this.navCtrl = navCtrl;
        this.platform = platform;
        this.usersService = usersService;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.tripsSubscriptionsService = tripsSubscriptionsService;
        this.data = new User("", "", "", "", "", "", "");
        this.platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            NativeStorage.getItem('login')
                .then(function (user) {
                console.log("stored login");
                console.log(user);
                _this.loader = _this.loadingCtrl.create({
                    content: "Ingresando..."
                });
                _this.data = new User(user.username, user.password, user.id, user.lastUpdate, user.facebookid, user.avatar, user.name);
                _this.login(_this.data);
            }, function (error) {
                console.error(error);
            });
        });
    }
    // ionViewDidLoad(){
    //   console.log("singleton username: " + UsersService.currentUser);
    //   if(UsersService.currentUser != undefined){
    //     console.log('llegue');
    //     this.data = UsersService.currentUser;
    //     this.rememberMe = true;
    //     this.login();
    //   }else{
    //     this.data.username = "";
    //     this.data.password = "";
    //   }
    //   }
    LoginPage.prototype.register = function () {
        this.navCtrl.push(RegisterPage);
    };
    LoginPage.prototype.facebookLogin = function () {
        var _this = this;
        this.rememberMe = true;
        this.fbService.login()
            .then(function (response) {
            _this.loader = _this.loadingCtrl.create({
                content: "Ingresando..."
            });
            _this.loader.present();
            var facebookid = response.authResponse.userID;
            var params = new Array();
            _this.fbService.getUser(params)
                .then(function (user) {
                user.picture = "https://graph.facebook.com/" + facebookid + "/picture?type=square";
                _this.usersService.facebookLogin(facebookid).then(function (u) {
                    console.log(u);
                    if (u == undefined) {
                        _this.usersService.facebookRegister(user.picture, facebookid, user.name).then(function (id) {
                            console.log("Registering facebook user...");
                            console.log(id);
                            u = new User("", "", id, "", facebookid, user.picture, user.name);
                            _this.login(u);
                        });
                    }
                    else {
                        u.avatar = user.picture;
                        _this.login(u);
                    }
                });
            });
        }, function (error) {
            var alert = this.alertCtrl.create({
                title: 'Error de autenticación.',
                subTitle: 'Se ha producido un error al intentar iniciar sesión con facebook.',
                buttons: ['OK']
            });
            alert.present();
            console.log(error);
        });
    };
    LoginPage.prototype.defaultLogin = function () {
        var _this = this;
        this.loader = this.loadingCtrl.create({
            content: "Ingresando..."
        });
        this.loader.present();
        var username = this.data.username;
        var password = this.data.password;
        this.usersService.defaultLogin(username, password).then(function (user) {
            if (user == undefined) {
                _this.loader.dismiss();
                var alert_1 = _this.alertCtrl.create({
                    title: 'Error de autenticación.',
                    subTitle: 'Usuario o contraseña son incorrectos.',
                    buttons: ['OK']
                });
                alert_1.present();
            }
            else {
                _this.login(user);
            }
        });
    };
    LoginPage.prototype.login = function (user) {
        var _this = this;
        console.log("Logging user...");
        console.log(user);
        UsersService.currentUser = user;
        this.data = user;
        if (this.rememberLogin) {
            this.rememberLogin();
        }
        this.tripsSubscriptionsService.getNumberOfNews(UsersService.currentUser.lastUpdate, UsersService.currentUser.id)
            .then(function (data) {
            TripsSubscriptionsService.numberOfNews = data;
            console.log("News at login time: " + TripsSubscriptionsService.numberOfNews);
            Badge.set(TripsSubscriptionsService.numberOfNews);
            _this.loader.dismiss();
            _this.navCtrl.setRoot(HomePage);
        });
    };
    LoginPage.prototype.rememberLogin = function () {
        NativeStorage.setItem('login', this.data)
            .then(function (response) {
            console.log('Stored item!');
        }, function (error) { return console.error('Error storing item', error); });
    };
    LoginPage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'login.html',
                    providers: [UsersService, TripsSubscriptionsService, FacebookService]
                },] },
    ];
    /** @nocollapse */
    LoginPage.ctorParameters = [
        { type: FacebookService, },
        { type: NavController, },
        { type: Platform, },
        { type: UsersService, },
        { type: LoadingController, },
        { type: AlertController, },
        { type: TripsSubscriptionsService, },
    ];
    return LoginPage;
}());
