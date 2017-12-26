import {User} from '../models/user';

export class Trip {
    Id;
    Active:boolean;
    Destination:string;
    Origin:string;
    StartDate:string;
    EndDate:string;
    LastUpdate:string;
    NumberOfLogs;
    User_Id;
    HasImage;
    Image;
    NumberOfSubscriptions;
    Subscribed;
    user:User;
    constructor(Id, Active,Destination,Origin,StartDate,EndDate,LastUpdate,NumberOfLogs,User_Id,HasImage,Image,NumberOfSubscriptions,user:User){
        this.Id = Id;
        this.Active = Active;
        this.Destination = Destination;
        this.Origin = Origin;
        this.StartDate = StartDate;
        this.EndDate = EndDate;
        this.LastUpdate = LastUpdate;
        this.NumberOfLogs = NumberOfLogs;
        this.User_Id = User_Id;
        this.HasImage = HasImage;
        this.Image = Image;
        this.NumberOfSubscriptions = NumberOfSubscriptions;
        this.user = user;
    }
}