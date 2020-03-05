import app from "firebase/app";
import "firebase/auth";
import "firebase/firebase-firestore";

const config = {
  apiKey: "AIzaSyCzjN5bpPYQ8xe-s7Oz4qH5sdManHhnosY",
  authDomain: "react-redux-login-8c0b0.firebaseapp.com",
  databaseURL: "https://react-redux-login-8c0b0.firebaseio.com",
  projectId: "react-redux-login-8c0b0",
  storageBucket: "react-redux-login-8c0b0.appspot.com",
  messagingSenderId: "536563746608",
  appId: "1:536563746608:web:67e998bbd9f7aabdbf6af5",
  measurementId: "G-2THBC8V5PH"
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
