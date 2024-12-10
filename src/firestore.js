const admin = require("firebase-admin");

// Pastikan file kredensial Anda sudah benar
const serviceAccount = require("../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = db;

