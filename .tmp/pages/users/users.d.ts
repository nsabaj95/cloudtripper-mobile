import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { UsersService } from '../../providers/users-service';
import { User } from '../../models/user';
export declare class UsersPage {
    navCtrl: NavController;
    usersService: UsersService;
    navParams: NavParams;
    loadingCtrl: LoadingController;
    users: User[];
    take: number;
    skip: number;
    loader: any;
    constructor(navCtrl: NavController, usersService: UsersService, navParams: NavParams, loadingCtrl: LoadingController);
    ionViewDidLoad(): void;
    loadUsers(): Promise<{}>;
    refreshUsers(refresher: any): void;
    showUser(user: any): void;
    doInfinite(infiniteScroll: any): void;
    private showLoader(message);
}
