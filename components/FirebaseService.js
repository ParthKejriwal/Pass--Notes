import firebase from 'firebase';
import db from '../config'
require('@firebase/firestore')
/*const firebaseConfig = { 
    apiKey: "AIzaSyCADv0WgqFpUWp-ufIjfZ0C5l5g5wcG4_Q",
    authDomain: "passnotes-82787.firebaseapp.com",
    databaseURL: "https://passnotes-82787.firebaseio.com",
    projectId: "passnotes-82787",
    storageBucket: "passnotes-82787.appspot.com",
    messagingSenderId: "68226431564",
    appId: "1:68226431564:web:3ab66db4c6ef4e9a8292e9"
};
firebase.initializeApp(firebaseConfig);*/
//const db = firebase.firestore();
const firebaseService = { 
    getAllPasswords: (username, methodToCallOnceDataIsAvailable) => { 
        var passwordsRef = db.collection("Passwords") .onSnapshot((snapshot) => { 
            const allPasswords = snapshot.docs.map((doc) => doc.data())
            console.log(allPasswords)
           // methodToCallOnceDataIsAvailable(allPasswords);
    })
    },
    getAllNotes: (username, methodToCallOnceDataIsAvailable) => { 
        var notessRef = db.collection("Notes") .onSnapshot((snapshot) => { 
            const allNotes = snapshot.docs.map((doc) => doc.data())
            console.log(allNotes)
            return(allNotes);
    })
    },
    saveNotes: (username, notesList) => { 
            db.collection('Notes').add({
              list:this.state.list,
              title:this.state.title,
              userId:"Parth"
            })
    },
    savePasswords: (username, passwordsList) => { 
            db.collection('Passwords').add({
              password:this.state.password,
              website:this.state.website,
              username:this.state.username
            }) 
    }
} 

export default firebaseService;
