import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { UsersService } from '../../providers/users-service';
import { User } from '../../models/user';
import { UserPage } from '../user/user';
export var UsersPage = (function () {
    function UsersPage(navCtrl, usersService, navParams, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.usersService = usersService;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.users = [];
        this.take = 10;
        this.skip = 0;
    }
    UsersPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.loader = this.loadingCtrl.create({
            content: "Obteniendo usuarios..."
        });
        this.loader.present();
        this.loadUsers().then(function () {
            _this.loader.dismiss();
        });
    };
    UsersPage.prototype.loadUsers = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.usersService.getAll(_this.skip, _this.take).then(function (data) {
                var users = Object.keys(data).map(function (k) { return data[k]; })[1];
                for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
                    var u = users_1[_i];
                    console.log(u);
                    _this.users.push(new User(u.UserName, "", u.Text, u.Id, u.LastUpdate, u.hasAvatar, u.HasAvatar == "1" ? u.Avatar : "img/avatar.png"));
                }
                resolve();
            });
        });
    };
    UsersPage.prototype.refreshUsers = function (refresher) {
        this.skip = 0;
        this.users = [];
        this.loadUsers().then(function () {
            refresher.complete();
        });
    };
    UsersPage.prototype.showUser = function (user) {
        this.navCtrl.push(UserPage, {
            user: user
        });
    };
    UsersPage.prototype.doInfinite = function (infiniteScroll) {
        this.skip += this.take;
        this.loadUsers().then(function () {
            infiniteScroll.complete();
        });
    };
    // showMap(trip_id){
    //   this.navCtrl.push(TripMapPage, {
    //     trip_id: trip_id
    //   });
    // }
    UsersPage.prototype.showLoader = function (message) {
        this.loader = this.loadingCtrl.create({
            content: message
        });
        this.loader.present();
    };
    UsersPage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'users.html',
                    providers: [UsersService]
                },] },
    ];
    /** @nocollapse */
    UsersPage.ctorParameters = [
        { type: NavController, },
        { type: UsersService, },
        { type: NavParams, },
        { type: LoadingController, },
    ];
    return UsersPage;
}());
