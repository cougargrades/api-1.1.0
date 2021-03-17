import * as functions from 'firebase-functions';
import { db } from '../_common';

export const whenUploadQueueAdded = functions.https.onRequest(async (request, response) => {
  // This works in the emulator!
  const docSnap = await db
    .collection('catalog')
    .doc('COSC 2440')
    .get();
  console.log(docSnap);

  // Testing write permissions
  const testDocRef = db.collection('scientists').doc('testDoc');
  await testDocRef.set({
    hello: 'world',
    now: new Date()
  });
  
  // This function must return void, so just do this
  response.send('Hello from Firebase!');
});