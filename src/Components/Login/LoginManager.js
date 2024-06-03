import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeLoginFramework = () => {
    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
}
export const handleGoogleSignIn = () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(googleProvider)
        .then(res => {
            const { displayName, photoURL, email } = res.user
            const signInUser = {
                isSignedIn: true,
                name: displayName,
                photo: photoURL,
                success: true,
                email: email,
            }
            // console.log(signInUser);
            setUserToken();
            return signInUser;
            // console.log(displayName, photoURL, email);
        })
        .catch(err => {
            console.log(err);
        })
}
const setUserToken = () => {
    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function (idToken) {
        sessionStorage.setItem('token', idToken)
        // console.log(idToken)
        // Send token to your backend via HTTPS
        // ...
    }).catch(function (error) {
        // Handle error
    });
}
export const handleFbSignIn = () => {
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    return firebase.auth().signInWithPopup(fbProvider).then(function (result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        user.success = true;
        return user;

    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

export const handleSignOut = () => {
    return firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                photo: '',
                email: '',
                error: '',
                success: false,

            }
            return signedOutUser

        }).catch(err => {

        });
}

export const createUserWithEmailAndPassword = (name, email, password) => {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            updateUserName(name);
            return newUserInfo;
        })

        .catch(error => {
            // Handle Errors here.
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            console.log(error)
            return newUserInfo;

        });
}

export const signInWithEmailAndPassword = (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = res.user;
            newUserInfo.error = '';
            newUserInfo.success = true;
            return newUserInfo;
            //   console.log('Signing in user info', res.user)
        })

        .catch(function (error) {
            // Handle Errors here.
            const newUserInfo = {};
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            return newUserInfo;
        });
}

const updateUserName = name => {
    const user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name
    }).then(function () {
        // Update successful.
    }).catch(function (error) {
        console.log(error);
    });
}