import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';

import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { FileTransfer } from '@ionic-native/file-transfer'
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { ComponentsModule } from './shared/components/components.module';

import { BarcodeScannerService } from './shared/services/barcode-scanner/barcode-scanner.service';

import { MyApp } from './app.component';

import { BarcodeScannerPage } from './pages/barcode-scanner/barcode-scanner.page';
import { HomePage } from './pages/home/home.page';

@NgModule({
  declarations: [
    BarcodeScannerPage,
    HomePage,
    MyApp
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp, {
      menuType: 'reveal'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    BarcodeScannerPage,
    HomePage,
    MyApp
  ],
  providers: [
    BarcodeScanner,
    BarcodeScannerService,
    Camera,
    File,
    FilePath,
    FileTransfer,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
