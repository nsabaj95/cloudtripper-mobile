export declare class Log {
    id: any;
    title: string;
    message: string;
    positionEnabled: boolean;
    date: Date;
    position_lat: string;
    position_lng: string;
    hasImage: boolean;
    image: string;
    userName: any;
    trip: any;
    constructor(id: any, title: any, message: any, positionEnabled: any, date: any, position_lat: any, position_lng: any, hasImage: any, image: any);
    isNew(lastUpdate: any): boolean;
}
