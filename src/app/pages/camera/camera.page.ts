import { Component } from '@angular/core';

import { ActionSheetController, LoadingController, ToastController, Loading } from 'ionic-angular';
import { Entry } from '@ionic-native/file';
import { FileTransfer, FileTransferObject, FileTransferError, FileUploadOptions, FileUploadResult } from '@ionic-native/file-transfer';

import { CameraService } from './../../shared/services/camera/camera.service';

@Component({
  selector: 'page-camera',
  templateUrl: './camera.page.html'
})
export class CameraPage {

  private serverUrl: string = 'https://node-file-upload-rck.now.sh';
  public photo: Entry = null;

  constructor(
    public cameraService: CameraService,
    public actionSheetController: ActionSheetController,
    public fileTransfer : FileTransfer,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) { }

  public onCamera() {
    this.actionSheetController.create({
      title: 'Select image source',
      buttons: [
        {
          text: 'Load from library',
          handler: () => {
            this.setPhoto(this.cameraService.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use camera',
          handler: () => {
            this.setPhoto(this.cameraService.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel'
        }
      ]
    }).present();
  }

  public onUpload() {
    let options: FileUploadOptions = {
      fileKey: 'photo',
      fileName: this.photo.name,
      chunkedMode: false,
      mimeType: 'multiple/form-data',
      params: {
       upload: new Date().getTime()
      }
    };

    let loading: Loading = this.loadingController.create({
      content: 'Loading...'
    });
    loading.present();

    const fileTransfer: FileTransferObject = this.fileTransfer.create();
    fileTransfer.upload(this.photo.nativeURL, `${this.serverUrl}/upload`, options)
      .then((data: FileUploadResult) => {
        console.log('Server data:', data);
        console.log('Response:', JSON.parse(data.response));

        console.log('Uploaded to:', `${this.serverUrl}/photo/${this.photo.name}`)
        this.showToast('Image successuflly uploaded!')
        loading.dismiss();
      })
      .catch((error: FileTransferError) => {
        console.log('Error while uploading file:', error);
        this.showToast('Error while uploading file.')
      });
  }

  private setPhoto(sourceType: number) {
    this.cameraService.takePicture(sourceType);
    setTimeout(() => {
        this.photo = this.cameraService.photo;
    }, 5000);
  }

  private showToast(message: string) {
    this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top'
    }).present();
  }
}
