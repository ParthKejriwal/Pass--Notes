import db from '../config'

const firebaseService = {
    getAllPasswords: (methodToCallOnceDataIsAvailable) => {
        db.collection("Passwords")
            .onSnapshot((snapshot) =>
                methodToCallOnceDataIsAvailable(snapshot.docs.map(doc => doc.data())));
    },
    getAllNotes: (methodToCallOnceDataIsAvailable) => {
        db.collection("Notes")
            .onSnapshot((snapshot) =>
                methodToCallOnceDataIsAvailable(snapshot.docs.map(doc => doc.data())));
    },
    saveNotes: (note) => {
        db.collection('Notes').add(note);
    },
    savePassword: (password) => {
        db.collection('Passwords').add(password);
    }
}

export default firebaseService;
