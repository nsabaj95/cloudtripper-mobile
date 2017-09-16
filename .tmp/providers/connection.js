export var Connection = (function () {
    function Connection() {
    }
    Connection.getUrl = function (ctrl) {
        return this.host + '/' + ctrl;
    };
    // static host = "http://localhost/v1";
    // static host = "http://192.168.1.12/v1";
    Connection.host = "http://54.144.225.166/v1";
    return Connection;
}());
