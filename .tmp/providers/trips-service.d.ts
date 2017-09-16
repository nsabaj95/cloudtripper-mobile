import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
export declare class TripsService {
    http: Http;
    alertCtrl: AlertController;
    apiurl: string;
    constructor(http: Http, alertCtrl: AlertController);
    handleError(error: any): any;
    getAllTripsByUser(user_id: any): Promise<{}>;
    getAllTripsBySubscriptor(user_id: any): Promise<{}>;
    getTrips(skip: any, take: any): Promise<{}>;
    getTripsByUser(skip: any, take: any, user_id: any): Promise<{}>;
    getTripsBySubscriptor(skip: any, take: any, subscriptor_id: any): Promise<{}>;
    uploadImage(origin: any, destination: any, startDate: any, endDate: any, user_id: any, imgUrl: any, lastUpdate: any): Promise<{}>;
    addTrip(origin: any, destination: any, startDate: any, endDate: any, user_id: any, imgUrl: any): Promise<{}>;
    delete(id: any): Promise<{}>;
    private get(link);
}
