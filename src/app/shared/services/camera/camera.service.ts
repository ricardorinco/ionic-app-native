import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { Entry } from '@ionic-native/file';
import { Platform } from 'ionic-angular';

import { FilePathService } from './../file-path/file-path.service';

@Injectable()
export class CameraService {

  public photo: Entry;

  constructor(
    public camera: Camera,
    private filePathService: FilePathService,
    private platform: Platform,
  ) { }

  public takePicture(sourceType: number) {
    return this.platform.ready()
      .then((readySource: string) => {
        this.camera.getPicture(this.getCameraOptions(sourceType))
          .then((fileUri: string) => {
            this.filePathService.saveFile(fileUri, sourceType)
              .then((entry: Entry) => {
                this.photo = entry;
                console.log(this.photo);
              });
          })
          .catch((error: Error) => {
            console.log('Error on camera:', error);
            return Promise.reject(error.message || error);
          });
      })
      .catch((error: Error) => {
        console.log('Platform not available:', error);
        return Promise.reject(error.message || error);
      });
  }

  private getCameraOptions(sourceType: number): CameraOptions {
    return {
      correctOrientation: true,
      quality: 50,
      saveToPhotoAlbum: true,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
  }

}
