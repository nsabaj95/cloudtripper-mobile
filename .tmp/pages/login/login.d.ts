import { NavController, LoadingController, AlertController, Platform } from 'ionic-angular';
import { UsersService } from '../../providers/users-service';
import { FacebookService } from '../../providers/facebook-service';
import { TripsSubscriptionsService } from '../../providers/trips-subscriptions-service';
import { User } from '../../models/user';
export declare class LoginPage {
    fbService: FacebookService;
    navCtrl: NavController;
    platform: Platform;
    usersService: UsersService;
    loadingCtrl: LoadingController;
    alertCtrl: AlertController;
    tripsSubscriptionsService: TripsSubscriptionsService;
    data: User;
    loader: any;
    rememberMe: boolean;
    constructor(fbService: FacebookService, navCtrl: NavController, platform: Platform, usersService: UsersService, loadingCtrl: LoadingController, alertCtrl: AlertController, tripsSubscriptionsService: TripsSubscriptionsService);
    register(): void;
    facebookLogin(): void;
    defaultLogin(): void;
    private login(user);
    private rememberLogin();
}
