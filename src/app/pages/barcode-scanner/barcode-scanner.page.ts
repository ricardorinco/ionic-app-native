import { Component } from '@angular/core';

import { BarcodeScanResult } from '@ionic-native/barcode-scanner';

import { BarcodeScannerService } from './../../shared/services/barcode-scanner/barcode-scanner.service';

@Component({
  selector: 'page-barcode-scanner',
  templateUrl: './barcode-scanner.page.html'
})
export class BarcodeScannerPage {

  public barcodeResult: BarcodeScanResult;

  constructor(public barcodeScannerService: BarcodeScannerService) { }

  public onGetBarcode() {
    this.barcodeScannerService.getBarcodeScanner()
      .then((barcodeResult: BarcodeScanResult) => {
        this.barcodeResult = barcodeResult;
        console.log('BarcodeScanner result:', barcodeResult)
      })
      .catch((error: Error) => console.log('BarcodeScanner error:', error))
  }

}
