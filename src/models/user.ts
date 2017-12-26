export class User {
    id;
    facebookid;
    username:string;
    password:string;
    avatar:string;
    lastUpdate:string;
    name:string;
    
    constructor(username, password, id, lastUpdate, facebookid, avatar, name){
        this.username = username;
        this.password = password;
        this.id = id;
        this.lastUpdate = lastUpdate;
        this.name = name;
        this.facebookid = facebookid;

        if(facebookid != undefined && facebookid != '')
            this.avatar = "https://graph.facebook.com/" + facebookid + "/picture?type=square";

    }

    public getAlias(){
        var alias = "";
        if(this.name != "" && this.name != null)
            alias = this.name;
        else
            alias = this.username;
        return alias;
    }
}