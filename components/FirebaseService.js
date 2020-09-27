import db from '../config'

const firebaseService = {
    getAllPasswords: (methodToCallOnceDataIsAvailable) => {
        db.collection("Passwords")
            .onSnapshot((snapshot) =>
                methodToCallOnceDataIsAvailable(snapshot.docs.map(doc => doc.data())));
    },
    getAllPasswordsWithId: (methodToCallOnceDataIsAvailable) => {
        db.collection("Passwords")
            .onSnapshot((snapshot) =>
                methodToCallOnceDataIsAvailable(snapshot.docs.map(doc => {
                    return {_id: doc.id, ...doc.data()}
                })));
    },
    getAllNotes: (methodToCallOnceDataIsAvailable) => {
        db.collection("Notes")
            .onSnapshot((snapshot) =>
                methodToCallOnceDataIsAvailable(snapshot.docs.map(doc => doc.data())));
    },
    getAllNotesWithId: (methodToCallOnceDataIsAvailable) => {
        db.collection("Notes")
            .onSnapshot((snapshot) =>
                methodToCallOnceDataIsAvailable(snapshot.docs.map(doc => {
                    return {_id: doc.id, ...doc.data()}
                })));
    },
    saveNotes: (note) => {
        db.collection('Notes').add(note);
    },
    updateNote: (id, note) => {
        db.collection('Notes').doc(id).set(note);
    },
    savePasswords: (passwords) => {
        db.collection('Passwords').add(passwords);
    },
    updatePasswords: (id, passwords) => {
        db.collection('Passwords').doc(id).set(passwords);
    },
    deleteNote: (id) => {
        db.collection("Notes").doc(id).delete().then(function () {
            console.log("Note successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing Note: ", error);
        });
    },
    deletePassword: (id) => {
        db.collection("Passwords").doc(id).delete().then(function () {
            console.log("Password successfully deleted!");
        }).catch(function (error) {
            console.error("Error removing Password: ", error);
        });
    }
}


export default firebaseService;
