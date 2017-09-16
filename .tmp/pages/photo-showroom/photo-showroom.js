import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoViewer } from 'ionic-native';
export var PhotoShowroomPage = (function () {
    function PhotoShowroomPage(navCtrl, navParams, sanitizier) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        // If we navigated to this page, we will have an item available as a nav param
        this.images = navParams.get('images');
    }
    PhotoShowroomPage.prototype.ionViewDidEnter = function () {
    };
    PhotoShowroomPage.prototype.showPhoto = function (image) {
        PhotoViewer.show(image);
    };
    PhotoShowroomPage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'photo-showroom.html'
                },] },
    ];
    /** @nocollapse */
    PhotoShowroomPage.ctorParameters = [
        { type: NavController, },
        { type: NavParams, },
        { type: DomSanitizer, },
    ];
    return PhotoShowroomPage;
}());
