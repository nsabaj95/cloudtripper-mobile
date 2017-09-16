export var User = (function () {
    function User(username, password, id, lastUpdate, facebookid, avatar, name) {
        this.username = username;
        this.password = password;
        this.id = id;
        this.lastUpdate = lastUpdate;
        this.facebookid = facebookid;
        this.avatar = avatar;
        this.name = name;
    }
    User.prototype.getAlias = function () {
        var alias = "";
        if (this.name != "" && this.name != null)
            alias = this.name;
        else
            alias = this.username;
        return alias;
    };
    return User;
}());
