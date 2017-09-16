import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Log } from '../../models/log';
import { LogsService } from '../../providers/logs-service';
export declare class NewsPage {
    navCtrl: NavController;
    navParams: NavParams;
    loadingCtrl: LoadingController;
    logsService: LogsService;
    logs: Log[];
    take: number;
    skip: number;
    loader: any;
    trip_id: any;
    lastUpdate: any;
    minDate: number;
    maxDate: number;
    constructor(navCtrl: NavController, navParams: NavParams, loadingCtrl: LoadingController, logsService: LogsService);
    ionViewDidLoad(): void;
    loadLogs(): Promise<{}>;
    refreshLogs(refresher: any): void;
    logTapped(event: any, item: any): void;
    doInfinite(infiniteScroll: any): void;
    showPhoto(log: Log): void;
    private loadLogsList(data);
    private showLoader(message);
    private setDefaultListValues();
}
