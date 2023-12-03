// batchUpdate.ts
import * as admin from 'firebase-admin';


const serviceAccount = require('/simple-crm-7dc7e-firebase-adminsdk-zh9gl-f8366e94e9.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://simple-crm-7dc7e.firebaseio.com',
});

const db = admin.firestore();

const batch = db.batch();
const usersCollection = db.collection('users');

// Beispiel-Update für alle Dokumente in der Sammlung 'users'
usersCollection.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    const userRef = usersCollection.doc(doc.id);
    batch.update(userRef, { level: 0, notes: ' ' });
  });

  // Commit des Batch-Updates
  return batch.commit();
}).then(() => {
  console.log('Batch update erfolgreich abgeschlossen.');
}).catch((error) => {
  console.error('Fehler beim Batch-Update:', error);
});
