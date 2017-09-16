import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
export declare class TripsSubscriptionsService {
    http: Http;
    alertCtrl: AlertController;
    apiurl: string;
    static lastUpdate: any;
    static numberOfNews: any;
    constructor(http: Http, alertCtrl: AlertController);
    handleError(error: any): any;
    getNumberOfNews(fromDate: any, user_id: any): Promise<{}>;
    subscribe(user_id: any, trip_id: any): Promise<{}>;
    unsubscribe(user_id: any, trip_id: any): Promise<{}>;
    getSubscriptions(trip_id: any): Promise<{}>;
}
