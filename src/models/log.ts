import {DateTimeHelper} from '../helpers/dateTimeHelper';

export class Log {
    id:any;
    title:string;
    message:string;
    positionEnabled:boolean;
    date:Date;
    position_lat:string;
    position_lng:string;
    hasImage:boolean;
    image:string;
    address:string;
    userName;
    trip;
    constructor(id, title, message, positionEnabled, date, position_lat, position_lng, hasImage,image,address){
        this.id = id;
        this.title = title;
        this.message = message;
        this.positionEnabled = positionEnabled;
        this.date = date;
        this.position_lat = position_lat;
        this.position_lng = position_lng;
        this.hasImage = hasImage;
        this.image = image;
        this.address = address;
    }

    isNew(lastUpdate){
        return DateTimeHelper.getUTCDateFromLocal(this.date) > lastUpdate;
    }
}