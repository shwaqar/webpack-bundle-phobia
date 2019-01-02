import * as admin from 'firebase-admin';

export default (key, dbUrl) =>
  admin.initializeApp({
    credential: admin.credential.cert(key),
    databaseURL: dbUrl
  });
