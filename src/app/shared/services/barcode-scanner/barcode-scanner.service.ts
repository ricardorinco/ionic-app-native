import { Injectable } from '@angular/core';

import { BarcodeScanner, BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { Platform } from 'ionic-angular';


@Injectable()
export class BarcodeScannerService {

  constructor(
    public barcodeScanner: BarcodeScanner,
    public platform: Platform,
  ) { }

  public getBarcodeScanner(): Promise<BarcodeScanResult> {
    return this.platform.ready()
      .then((readySource: string) => {
        return this.barcodeScanner.scan()
          .then((barcodeResult: BarcodeScanResult) => {
            console.log('BarcodeScanner result:', barcodeResult);
            return barcodeResult;
          })
          .catch((error: Error) => {
            console.log('Error BarcodeScanner:', error);
            return Promise.reject(error.message || error);
          });
      })
      .catch((error: Error) => {
        console.log('Platform not available:', error);
        return Promise.reject(error.message || error);
      });
  }

}
