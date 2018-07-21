import { Injectable } from '@angular/core';

import { Camera } from '@ionic-native/camera';
import { Entry, File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Platform } from 'ionic-angular';

@Injectable()
export class FilePathService {

  constructor(
    private camera: Camera,
    private file: File,
    private filePath: FilePath,
    private platform: Platform,
  ) { }

  public saveFile(fileUri: string, sourceType: number): Promise<Entry> {
    return this.correctPathAndFileName(fileUri, sourceType)
      .then((data: { oldFilePath: string, oldFileName: string }) => {
        return this.file.copyFile(data.oldFilePath, data.oldFileName, this.file.dataDirectory, this.newFileName(data.oldFileName))
          .then((entry: Entry) => {
            return entry;
          })
          .catch((error: Error) => {
            console.log('Error on correct path android:', error);
            return Promise.reject(error.message || error);
          });
      })
      .catch((error: Error) => {
        console.log('Error on correct path android:', error);
        return Promise.reject(error.message || error);
      });
  }

  private correctPathAndFileName(fileUri: string, sourceType: number): Promise<{ oldFilePath: string, oldFileName: string }> {
    if (this.platform.is('android') && sourceType == this.camera.PictureSourceType.PHOTOLIBRARY) {
      return this.filePath.resolveNativePath(fileUri)
        .then((correctFileUri: string) => {
          return {
            oldFilePath: correctFileUri.substr(0, (correctFileUri.lastIndexOf('/') + 1)),
            oldFileName: fileUri.substring((fileUri.lastIndexOf('/') + 1), fileUri.lastIndexOf('?'))
          }
        })
        .catch((error: Error) => {
          console.log('Error on correct path android:', error);
          return Promise.reject(error.message || error);
        });
    }

    return Promise.resolve({
      oldFilePath: fileUri.substr(0, (fileUri.lastIndexOf('/') + 1)),
      oldFileName: fileUri.substr((fileUri.lastIndexOf('/') + 1))
    });
  }

  private newFileName(oldFileName: string): string {
    let extension: string = oldFileName.substr(oldFileName.lastIndexOf('.'));

    return new Date().getTime() + extension;
  }

}
