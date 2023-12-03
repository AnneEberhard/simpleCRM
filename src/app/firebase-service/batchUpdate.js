"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// batchUpdate.ts
var admin = require("firebase-admin");
var serviceAccount = require('/simple-crm-7dc7e-firebase-adminsdk-zh9gl-f8366e94e9.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://simple-crm-7dc7e.firebaseio.com',
});
var db = admin.firestore();
var batch = db.batch();
var usersCollection = db.collection('users');
// Beispiel-Update für alle Dokumente in der Sammlung 'users'
usersCollection.get().then(function (querySnapshot) {
    querySnapshot.forEach(function (doc) {
        var userRef = usersCollection.doc(doc.id);
        batch.update(userRef, { level: 0, notes: ' ' });
    });
    // Commit des Batch-Updates
    return batch.commit();
}).then(function () {
    console.log('Batch update erfolgreich abgeschlossen.');
}).catch(function (error) {
    console.error('Fehler beim Batch-Update:', error);
});
