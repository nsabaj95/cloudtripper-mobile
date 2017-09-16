export class User {
    constructor(username, password, id, lastUpdate, facebookid, avatar, name){
        this.username = username;
        this.password = password;
        this.id = id;
        this.lastUpdate = lastUpdate;
        this.facebookid = facebookid;
        this.avatar = avatar;
        this.name = name;
    }

    id;
    facebookid;
    username:string;
    password:string;
    avatar:string;
    lastUpdate:string;
    name:string;
    
    public getAlias(){
        var alias = "";
        if(this.name != "" && this.name != null)
            alias = this.name;
        else
            alias = this.username;
        return alias;
    }
}