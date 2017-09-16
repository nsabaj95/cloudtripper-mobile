import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
export declare class LogsService {
    http: Http;
    alertCtrl: AlertController;
    apiurl: string;
    constructor(http: Http, alertCtrl: AlertController);
    handleError(error: any): any;
    getAllLogs(): Promise<{}>;
    getAllLogsByTripId(trip_id: any): Promise<{}>;
    getLogsByTripId(skip: any, take: any, trip_id: any): Promise<{}>;
    getLogsBySubscriptorId(skip: any, take: any, subscriptor_id: any, updateDate: any): Promise<{}>;
    uploadImage(title: any, message: any, positionEnabled: any, lat: any, lng: any, date: any, imgUrl: any, trip_id: any): Promise<{}>;
    onProgress(): void;
    addLog(title: any, message: any, positionEnabled: any, lat: any, lng: any, date: any, imgUrl: any, trip_id: any): Promise<{}>;
    delete(id: any, trip_id: any): Promise<{}>;
    private getLogs(data);
}
