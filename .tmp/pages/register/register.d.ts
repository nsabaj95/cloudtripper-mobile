import { NavController, LoadingController, AlertController, Platform, ActionSheetController, ToastController } from 'ionic-angular';
import { UsersService } from '../../providers/users-service';
export declare class RegisterPage {
    navCtrl: NavController;
    platform: Platform;
    actionSheetCtrl: ActionSheetController;
    toastCtrl: ToastController;
    usersService: UsersService;
    loadingCtrl: LoadingController;
    alertCtrl: AlertController;
    loader: any;
    username: any;
    password: any;
    text: any;
    avatar: any;
    hasAvatar: any;
    constructor(navCtrl: NavController, platform: Platform, actionSheetCtrl: ActionSheetController, toastCtrl: ToastController, usersService: UsersService, loadingCtrl: LoadingController, alertCtrl: AlertController);
    presentAddPictureActionSheet(): void;
    takePicture(pictureSourceType: any): void;
    register(): void;
    presentToast(): void;
}
