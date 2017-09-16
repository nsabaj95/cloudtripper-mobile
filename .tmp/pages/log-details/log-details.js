import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DomSanitizer } from '@angular/platform-browser';
import { PhotoViewer } from 'ionic-native';
export var LogDetailsPage = (function () {
    function LogDetailsPage(navCtrl, navParams, sanitizier) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.showMaps = false;
        // If we navigated to this page, we will have an item available as a nav param
        this.selectedLog = navParams.get('selectedLog');
        this.showMaps = this.selectedLog.positionEnabled;
        this.base64Image = this.selectedLog.image;
    }
    LogDetailsPage.prototype.ionViewDidEnter = function () {
        this.loadMap();
    };
    LogDetailsPage.prototype.showPhoto = function (log) {
        PhotoViewer.show(log.image, log.title);
    };
    LogDetailsPage.prototype.loadMap = function () {
        if (this.mapElement != undefined) {
            var latLng = new google.maps.LatLng(this.selectedLog.position_lat, this.selectedLog.position_lng);
            var mapOptions = {
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true
            };
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
            var marker = new google.maps.Marker({
                position: latLng,
                title: 'new marker',
                draggable: true,
                map: this.map
            });
            this.map.setCenter(marker.getPosition());
        }
    };
    LogDetailsPage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'log-details.html'
                },] },
    ];
    /** @nocollapse */
    LogDetailsPage.ctorParameters = [
        { type: NavController, },
        { type: NavParams, },
        { type: DomSanitizer, },
    ];
    LogDetailsPage.propDecorators = {
        'mapElement': [{ type: ViewChild, args: ['map',] },],
    };
    return LogDetailsPage;
}());
