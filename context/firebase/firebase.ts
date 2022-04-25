import {firebaseConfig} from './firebaseConfig';
import firebase from 'firebase/compat';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

class Firebase {
  private app: firebase.app.App;
  public db: firebase.firestore.Firestore;
  public storage: firebase.storage.Storage;

  constructor() {
    this.app = firebase.initializeApp(firebaseConfig);
    this.db = this.app.firestore();
    this.storage = this.app.storage();
    this.db.settings({experimentalForceLongPolling: true});
  }
}

export default Firebase;
