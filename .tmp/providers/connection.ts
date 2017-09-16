export class Connection {
    // static host = "http://localhost/v1";
    // static host = "http://192.168.1.12/v1";
    static host = "http://54.144.225.166/v1";

    public static getUrl(ctrl:String){
        return this.host + '/' + ctrl;
    }
}