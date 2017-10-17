// import { IonicImageViewerModule } from 'ionic-img-viewer';
import { ImageResizer } from '@ionic-native/image-resizer';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { LogHistoryPage } from '../pages/log-history/log-history';
import { LogYourMomentPage } from '../pages/log-your-moment/log-your-moment';
import { LogDetailsPage } from '../pages/log-details/log-details';
import { TripMapPage } from '../pages/trip-map/trip-map';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { NewTripPage } from '../pages/new-trip/new-trip';
import { TripDetailsPage } from '../pages/trip-details/trip-details';
import { TripsPage } from '../pages/trips/trips';
import { PhotoShowroomPage } from '../pages/photo-showroom/photo-showroom';
import { NewsPage } from '../pages/news/news';
import { RegisterPage } from '../pages/register/register';
import { UsersPage } from '../pages/users/users';
import { UserPage } from '../pages/user/user';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    LogHistoryPage,
    LogYourMomentPage,
    LogDetailsPage,
    TripMapPage,
    LoginPage,
    HomePage,
    NewTripPage,
    TripDetailsPage,
    TripsPage,
    PhotoShowroomPage,
    NewsPage,
    RegisterPage,
    UsersPage,
    UserPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp)
    // IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LogHistoryPage,
    LogYourMomentPage,
    LogDetailsPage,
    TripMapPage,
    LoginPage,
    HomePage,
    NewTripPage,
    TripDetailsPage,
    TripsPage,
    PhotoShowroomPage,
    NewsPage,
    RegisterPage,
    UsersPage,
    UserPage
  ],
  providers: [
    ImageResizer,
    PhotoViewer
  ]
})

export class AppModule {}
