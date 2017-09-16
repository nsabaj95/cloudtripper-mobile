import { DateTimeHelper } from '../helpers/dateTimeHelper';
export var Log = (function () {
    function Log(id, title, message, positionEnabled, date, position_lat, position_lng, hasImage, image) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.positionEnabled = positionEnabled;
        this.date = date;
        this.position_lat = position_lat;
        this.position_lng = position_lng;
        this.hasImage = hasImage;
        this.image = image;
    }
    Log.prototype.isNew = function (lastUpdate) {
        return DateTimeHelper.getUTCDateFromLocal(this.date) > lastUpdate;
    };
    return Log;
}());
