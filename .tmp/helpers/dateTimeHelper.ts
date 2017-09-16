import moment from 'moment';

export class DateTimeHelper {
    public static getLocalDate(){
        return moment(new Date().toLocaleString()).format("YYYY-MM-DD HH:mm:ss");
    }
    public static getUTCDate(){
        return moment.utc(new Date()).format("YYYY-MM-DD HH:mm:ss");
    }
    public static getLocalDateFromUTC(utcDate){
        var minutesOffset:number = new Date().getTimezoneOffset();
        var date = moment(utcDate).add(-minutesOffset, "minutes").format("YYYY-MM-DD HH:mm:ss");
        return date;
    }
    public static getUTCDateFromLocal(localDate){
        var minutesOffset:number = new Date().getTimezoneOffset();
        var date = moment(localDate).add(minutesOffset, "minutes").format("YYYY-MM-DD HH:mm:ss");
        return date;
    }
}