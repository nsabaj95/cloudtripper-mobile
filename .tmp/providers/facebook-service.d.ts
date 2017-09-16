import { FacebookLoginResponse } from 'ionic-native';
export declare class FacebookService {
    constructor();
    login(): Promise<FacebookLoginResponse>;
    getUser(params: any): Promise<any>;
}
