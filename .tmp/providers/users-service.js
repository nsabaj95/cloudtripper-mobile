import moment from 'moment';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { User } from '../models/user';
import { Connection } from '../providers/connection';
import { TripsSubscriptionsService } from '../providers/trips-subscriptions-service';
export var UsersService = (function () {
    function UsersService(http, alertCtrl) {
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.apiurl = Connection.getUrl("users");
    }
    UsersService.prototype.handleError = function (error) {
        console.log(error);
        return error.json().message || 'Server error, please try again later';
    };
    UsersService.prototype.defaultLogin = function (username, password) {
        var data = '?username=' + username + '&password=' + password;
        return this.login(data);
    };
    UsersService.prototype.facebookLogin = function (facebookid) {
        var data = '?facebookid=' + facebookid;
        return this.login(data);
    };
    UsersService.prototype.getAll = function (skip, take) {
        var _this = this;
        var link = this.apiurl + '?skip=' + encodeURIComponent(skip) + '&take=' + encodeURIComponent(take);
        return new Promise(function (resolve) {
            _this.http.get(link)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data.error);
            }, function (error) {
                console.log(error);
            });
        });
    };
    UsersService.prototype.defaultRegister = function (username, password) {
        var data = JSON.stringify({ username: username, password: password, avatar: "", facebookid: "", name: "", action: "register" });
        return this.register(data);
    };
    UsersService.prototype.facebookRegister = function (avatar, facebookid, name) {
        var data = JSON.stringify({ username: "", password: "", avatar: avatar, facebookid: facebookid, name: name, action: "register" });
        return this.register(data);
    };
    UsersService.prototype.register = function (data) {
        var _this = this;
        return new Promise(function (resolve) {
            _this.http.post(_this.apiurl, data)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                resolve(data);
            }, function (error) {
                resolve(error);
            });
        });
    };
    UsersService.prototype.update = function (id, text) {
        var _this = this;
        var data = JSON.stringify({ id: id, text: text });
        return new Promise(function (resolve) {
            _this.http.put(_this.apiurl, data)
                .subscribe(function (data) {
                resolve(true);
            }, function (error) {
                console.log("ERROR!: ", error);
                resolve(false);
            });
        });
        // }
    };
    UsersService.prototype.getUser = function (id) {
        var _this = this;
        var data = JSON.stringify({ id: id });
        return new Promise(function (resolve) {
            _this.http.post(_this.apiurl, data)
                .map(function (res) { return res.json(); })
                .subscribe(function (data) {
                if (data.error)
                    resolve(false);
                else
                    resolve(true);
            }, function (error) {
                console.log("Oooops!");
            });
        });
    };
    UsersService.prototype.login = function (data) {
        var _this = this;
        var link = this.apiurl + data;
        return new Promise(function (resolve) {
            _this.http.get(link)
                .map(function (res) { return res.json(); })
                .subscribe(function (result) {
                if (result.success) {
                    var user = result.data;
                    UsersService.currentUser = new User(user.username, user.password, user.id, user.lastupdate, user.facebookid, user.avatar, user.name);
                    TripsSubscriptionsService.numberOfNews = 0;
                    var minutesOffset = new Date().getTimezoneOffset();
                    var date = moment(user.lastupdate).add(-minutesOffset, "minutes").format("YYYY-MM-DD HH:mm:ss");
                    TripsSubscriptionsService.lastUpdate = date;
                    resolve(UsersService.currentUser);
                }
                else {
                    resolve(undefined);
                }
            }, function (error) {
                console.log("Oooops!");
                resolve(error);
            });
        });
    };
    UsersService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    UsersService.ctorParameters = [
        { type: Http, },
        { type: AlertController, },
    ];
    return UsersService;
}());
