import * as firebase from "firebase";
import {User} from "../domain/user.model";
import {Annonce} from "../domain/annonce.model";
import {FirebaseUtilityService} from "./FirebaseUtilityService";
import {Injectable} from "@angular/core";
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;

@Injectable()
export class PhotoService {

  constructor(private firebaseUtilityService: FirebaseUtilityService) {
  }

  getPhotoFromUidAnnonce(uidAnnonce: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/photos').orderByChild('uidAnnonce').once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  /**
   *
   * @param fileToUpload: File
   * @param author: User
   * @param annonce: Annonce
   * @Return Promise<string> Which will contain the download url of the uploaded file or in failure case the reason.
   */
  uploadImage(fileToUpload: File, author: User, annonce: Annonce): Promise<UploadTaskSnapshot> {
    return new Promise(async (resolve, reject) => {
      // Create a root reference
      const storageRef = firebase.storage().ref();

      // Get the timestamp from the server
      const timestampServer = await this.firebaseUtilityService.getServerTimestamp();

      // Create a reference to the specific file
      // Pour créer une référence unique il faudra mettre UIDAuthor + UIDAnnonce + Timestamp + ImageName
      const nameReference: string = author.uid + "_" + annonce.uuid + "_" + timestampServer + "_" + fileToUpload.name;
      const ref = storageRef.child(nameReference);

      ref.put(fileToUpload)
        .then(function (snapshot) {
          if (snapshot.state === 'success') {
            console.log('Uploaded a file!');
            resolve(snapshot);
          } else {
            reject('Upload failed!');
          }
        })
        .catch(reason => reject(reason));
    });
  }

  deleteFile(fileName: string): Promise<any> {
    const reference = firebase.storage().ref().child(fileName);
    return reference.delete();
  }
}
