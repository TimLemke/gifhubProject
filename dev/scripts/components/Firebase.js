import firebase from 'firebase';

// Initialize Firebase
var config = {
	apiKey: "AIzaSyDbuGw2BgSs1vdH7LlH7qRdw0aZZcK--Yk",
	authDomain: "timlemke-gifhub.firebaseapp.com",
	databaseURL: "https://timlemke-gifhub.firebaseio.com",
	projectId: "timlemke-gifhub",
	storageBucket: "",
	messagingSenderId: "907531466804"
};

firebase.initializeApp(config);

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export default firebase;