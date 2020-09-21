import firebaseService from "./FirebaseService";

const sampleNote = {
    list: 'my notes text 1',
    title: 'my title 1'
}

const samplePassword = {
    password: 'my-password',
    website: 'www.my-website.com',
    username: 'my-username'
}

const updatedPassword = {
    password: 'updated-password2',
    website: 'www.my-website.com',
    username: 'my-username'
}

const logTheList = (list) => {
    console.log('...printing list...');
    console.log(JSON.stringify(list));
}

// firebaseService.savePassword(samplePassword);
// firebaseService.saveNotes(sampleNote);

firebaseService.getAllNotesWithId(logTheList);
firebaseService.getAllNotes(logTheList);
// firebaseService.updatePassword('47PiBIlH9Bj12aAdLZ3K', updatedPassword);