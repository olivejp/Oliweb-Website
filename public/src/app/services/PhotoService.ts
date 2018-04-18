import * as firebaseA from "firebase";

export class PhotoService {

  constructor() {
  }

  getPhotoFromUidAnnonce(uidAnnonce: string) {
    return new Promise(
      (resolve, reject) => {
        firebaseA.database().ref('/photos').orderByChild('uidAnnonce').once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }
}
