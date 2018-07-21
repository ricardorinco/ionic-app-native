import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { MenuController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { PageModel } from './models/page.model';

import { BarcodeScannerPage } from './pages/barcode-scanner/barcode-scanner.page';
import { CameraPage } from './pages/camera/camera.page';
import { HomePage } from './pages/home/home.page';

@Component({
  templateUrl: './app.component.html'
})
export class MyApp implements AfterViewInit {

  @ViewChild(Nav) navController: Nav;

  public pages: PageModel[];
  public rootPage: any = HomePage;

  constructor(
    public menuController: MenuController,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.setPages();
  }

  ngAfterViewInit() {
    this.menuController.open('menu1');
  }

  public openPage(page: PageModel) {
    this.navController.setRoot(page.component);
  }

  private setPages() {
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Barcode Scanner', component: BarcodeScannerPage },
      { title: 'Camera', component: CameraPage }
    ]
  }
}

