const admin = require('firebase-admin');
const serviceAccount = require('../prioritymatrix-d45cc-firebase-adminsdk-cpfx3-a182e9bd74.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
