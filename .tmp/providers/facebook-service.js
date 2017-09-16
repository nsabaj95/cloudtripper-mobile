import { Injectable } from '@angular/core';
import { Facebook } from 'ionic-native';
export var FacebookService = (function () {
    // apiurl:string = 'http://192.168.1.12:8000/api';
    function FacebookService() {
    }
    FacebookService.prototype.login = function () {
        return Facebook.login(['public_profile', 'user_friends', 'email']);
    };
    FacebookService.prototype.getUser = function (params) {
        return Facebook.api("/me?fields=name,gender", params);
    };
    FacebookService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    FacebookService.ctorParameters = [];
    return FacebookService;
}());
