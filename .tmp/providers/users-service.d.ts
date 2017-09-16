import { Http } from '@angular/http';
import { AlertController } from 'ionic-angular';
import { User } from '../models/user';
export declare class UsersService {
    http: Http;
    alertCtrl: AlertController;
    static currentUser: User;
    apiurl: string;
    constructor(http: Http, alertCtrl: AlertController);
    handleError(error: any): any;
    defaultLogin(username: any, password: any): Promise<{}>;
    facebookLogin(facebookid: any): Promise<{}>;
    getAll(skip: any, take: any): Promise<{}>;
    defaultRegister(username: any, password: any): Promise<{}>;
    facebookRegister(avatar: any, facebookid: any, name: any): Promise<{}>;
    private register(data);
    update(id: any, text: any): Promise<{}>;
    getUser(id: any): Promise<{}>;
    private login(data);
}
