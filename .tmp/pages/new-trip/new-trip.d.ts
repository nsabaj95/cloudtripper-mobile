import { NavController, AlertController, LoadingController, ActionSheetController, NavParams, ToastController } from 'ionic-angular';
import { TripsService } from '../../providers/trips-service';
import { UsersService } from '../../providers/users-service';
export declare class NewTripPage {
    navCtrl: NavController;
    usersService: UsersService;
    tripsService: TripsService;
    toastCtrl: ToastController;
    navParams: NavParams;
    alertCtrl: AlertController;
    loadingCtrl: LoadingController;
    actionSheetCtrl: ActionSheetController;
    origin: string;
    destination: string;
    startDate: string;
    endDate: string;
    user_id: any;
    base64Image: string;
    loader: any;
    constructor(navCtrl: NavController, usersService: UsersService, tripsService: TripsService, toastCtrl: ToastController, navParams: NavParams, alertCtrl: AlertController, loadingCtrl: LoadingController, actionSheetCtrl: ActionSheetController);
    presentAddPictureActionSheet(): void;
    takePicture(pictureSourceType: any): void;
    showAlert(): void;
    submit(): void;
    presentToast(): void;
    ionViewDidLoad(): void;
}
