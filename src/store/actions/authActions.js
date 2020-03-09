import firebase from 'react-native-firebase';
import firestore from '@react-native-firebase/firestore';
const db = firestore();

function userSignup(email, pass) {
    return dispatch => {
        db.collection('users')
        .where('email', '==', email)
        .get()
        .then(querySnapshot => {
            if(querySnapshot.size === 0) {
                firebase
                .auth()
                .createUserWithEmailAndPassword(email, pass);
            } else {
                console.log("User with given email already exists!");
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
}

function userSignIn(email, pass) {
    return dispatch => {
        db.collection('users')
        .where('email', '==', email)
        .get()
        .then(querySnapshot => {
            if(querySnapshot.size !== 0) {
                firebase
                .auth()
                .signInWithEmailAndPassword(email, pass);
            } else {
                console.log("User with given email does not exist!");
            }
        })
        .catch(error => {
            console.log(error);
        })
    }
}

function userSignOut() {
    return dispatch => {
        firebase
        .auth()
        .signOut()
        .then(() => {
            console.log("User signed out successfully!");
        })
        .catch(error => {
            console.log(error);
        })
    }
}