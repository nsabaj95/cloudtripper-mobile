import { Nav, Platform } from 'ionic-angular';
import { TripsSubscriptionsService } from '../providers/trips-subscriptions-service';
export declare class MyApp {
    platform: Platform;
    tripsSubscriptionsService: TripsSubscriptionsService;
    nav: Nav;
    rootPage: any;
    usersService: any;
    pages: Array<{
        title: string;
        component: any;
        icon: string;
    }>;
    tripsSubscriptions: any;
    constructor(platform: Platform, tripsSubscriptionsService: TripsSubscriptionsService);
    initializeApp(tripsSubscriptionsService: any): void;
    startGettingNews(tripsSubscriptionsService: any): void;
    openPage(page: any): void;
    signOut(): void;
    hideSplashScreen(): void;
}
