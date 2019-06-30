import * as functions from 'firebase-functions';

// Firebase
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);

// Cloud Vision
//import * as vision from '@google-cloud/vision';
// import * as vision from '@google-cloud/vision';
const vision = require('@google-cloud/vision');
const visionClient =  new vision.ImageAnnotatorClient();

// Dedicated bucket for cloud function invocation
const bucketName = 'crudfirebase-f654a.appspot.com';

export const imageTagger = functions.storage
    .bucket(bucketName)
    .object()
    .onFinalize( async event => {

            // File data
            const object = event.name;
            const filePath = object;   

            // Location of saved file in bucket
            const imageUri = `gs://${bucketName}/${filePath}`;

            // Firestore docID === file name
            const docId = filePath.split('.jpg')[0];

            const docRef  = admin.firestore().collection('photos').doc(docId);

            // Await the cloud vision response
            const results = await visionClient.labelDetection(imageUri);

            // Map the data to desired format
            const labels = results[0].labelAnnotations.map(obj => obj.description);
            const hotdog = labels.includes('hot dog')


            return docRef.set({ hotdog, labels })
                

});



// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
