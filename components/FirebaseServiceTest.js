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

const logTheList = (list) => {
    console.log('...printing list...');
    console.log(JSON.stringify(list));
}

// firebaseService.savePassword(samplePassword);
// firebaseService.saveNotes(sampleNote);

firebaseService.getAllPasswords(logTheList);
firebaseService.getAllNotes(logTheList);