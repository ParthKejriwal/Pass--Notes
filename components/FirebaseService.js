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
    savePassword: (password) => {
        db.collection('Passwords').add(password);
    },
    updatePassword: (id, password) => {
        db.collection('Passwords').doc(id).set(password);
    }
}

export default firebaseService;
