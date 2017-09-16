import moment from 'moment';
export var DateTimeHelper = (function () {
    function DateTimeHelper() {
    }
    DateTimeHelper.getLocalDate = function () {
        return moment(new Date().toLocaleString()).format("YYYY-MM-DD HH:mm:ss");
    };
    DateTimeHelper.getUTCDate = function () {
        return moment.utc(new Date()).format("YYYY-MM-DD HH:mm:ss");
    };
    DateTimeHelper.getLocalDateFromUTC = function (utcDate) {
        var minutesOffset = new Date().getTimezoneOffset();
        var date = moment(utcDate).add(-minutesOffset, "minutes").format("YYYY-MM-DD HH:mm:ss");
        return date;
    };
    DateTimeHelper.getUTCDateFromLocal = function (localDate) {
        var minutesOffset = new Date().getTimezoneOffset();
        var date = moment(localDate).add(minutesOffset, "minutes").format("YYYY-MM-DD HH:mm:ss");
        return date;
    };
    return DateTimeHelper;
}());
