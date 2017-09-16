export declare class User {
    constructor(username: any, password: any, id: any, lastUpdate: any, facebookid: any, avatar: any, name: any);
    id: any;
    facebookid: any;
    username: string;
    password: string;
    avatar: string;
    lastUpdate: string;
    name: string;
    getAlias(): string;
}
