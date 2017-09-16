import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { TripsService } from '../../providers/trips-service';
import { LogsService } from '../../providers/logs-service';
import { UsersService } from '../../providers/users-service';
import { TripsSubscriptionsService } from '../../providers/trips-subscriptions-service';
import { Trip } from '../../models/trip';
export declare class HomePage {
    navCtrl: NavController;
    alertCtrl: AlertController;
    logsService: LogsService;
    tripsService: TripsService;
    usersService: UsersService;
    navParams: NavParams;
    loadingCtrl: LoadingController;
    trips: Trip[];
    user: any;
    loader: any;
    defaultUrlImage: any;
    tripsSubscriptionsService: typeof TripsSubscriptionsService;
    constructor(navCtrl: NavController, alertCtrl: AlertController, logsService: LogsService, tripsService: TripsService, usersService: UsersService, navParams: NavParams, loadingCtrl: LoadingController);
    ionViewDidLoad(): void;
    loadTrips(): Promise<{}>;
    loadLogs(trip: any): void;
    showMap(trip_id: any): void;
    showTripDetails(selectedTrip: any): void;
    addLog(trip_id: any): void;
    addTrip(): void;
    deleteTrip(id: any): void;
    private showLoader(message);
}
