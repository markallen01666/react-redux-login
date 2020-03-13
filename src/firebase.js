import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyAHcOrdypfqTMSRCMGOf6va8M8bliCSQqE",
    authDomain: "react-redux-login-836a1.firebaseapp.com",
    databaseURL: "https://react-redux-login-836a1.firebaseio.com",
    projectId: "react-redux-login-836a1",
    storageBucket: "react-redux-login-836a1.appspot.com",
    messagingSenderId: "79228523112",
    appId: "1:79228523112:web:3304688a67a35ff73ee1dd",
    measurementId: "G-92RPHFZXZC"
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  login(email, password) {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout() {
    return this.auth.signOut();
  }

  async register(name, email, password) {
    await this.auth.createUserWithEmailAndPassword(email, password);
    return this.auth.currentUser.updateProfile({
      displayName: name
    });
  }

  isInitialized() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  getCurrentUsername() {
    return this.auth.currentUser && this.auth.currentUser.displayName;
  }
}

export default new Firebase();
